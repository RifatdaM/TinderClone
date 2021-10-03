import 'react-native-gesture-handler';
import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  event,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

// object for declired details for user
const ROTATION = 40;

// Main app function
const App = () => {
  // screenWidth
  const {width: screenWidth} = useWindowDimensions(); 

  // OUT OF THE SCREEN
  const hiddenTranslateX = 2 * screenWidth;

  // Animation
  const translateX = useSharedValue(0); //-screenWidth    0     screenWidth
  const rotate = useDerivedValue(() => interpolate(
      translateX.value, [0, hiddenTranslateX], [0, ROTATION],
    ) + 'deg',); //-60deg          0deg  60deg

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        rotate: rotate.value,
      },
    ],
  }));

  // Gesture Handler
  const gestureHendler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: () => {},
  });

  // Mobile View
  return (
    <View style={styles.pageContainer}>
      <PanGestureHandler onGestureEvent={gestureHendler}>
        <Animated.View style={[styles.animatedCard, cardStyle]}>
          <Card user={users[0]} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

// Style
const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  animatedCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Export the full file to use
export default App;
