import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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
  runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

// object for declired details for user
const ROTATION = 40;
const SWIPE_VELOCITY = 800;

// Main app function
const App = () => {
  // STATE OF USER
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = users[currentIndex];
  const nextProfile = users[nextIndex];

  // SCREEN WIDTH
  const {width: screenWidth} = useWindowDimensions();

  // OUT OF THE SCREEN
  const hiddenTranslateX = 2 * screenWidth;

  // ANIMATION
  // value calculation for the rotate and translate
  const translateX = useSharedValue(0); //-screenWidth    0     screenWidth
  const rotate = useDerivedValue(
    () =>
      interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION]) +
      'deg',
  ); //-60deg          0deg       60deg

  // rotate and transform animation of the cards
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

  // next card comming up and opacity animation
  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.9, 1],
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.4, 1],
    ),
  }));

  // GUSTURE HENDLER
  const gestureHendler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
    },
    onEnd: event => {
      // bring the card bacl in the position
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);

        return;
      }

      // shipw the card out of the screen
      translateX.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX),
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1), // next card being current card
      );
    },
  });

  // set next index
  useEffect(() => {
    translateX.value = 0;
    setNextIndex(currentIndex + 1);
  }, [currentIndex, translateX]);

  // VIEW
  return (
    <View style={styles.pageContainer}>
      <View style={styles.nextCardContainer}>
        <Animated.View style={[styles.animatedCard, nextCardStyle]}>
          <Card user={nextProfile} />
        </Animated.View>
      </View>

      <PanGestureHandler onGestureEvent={gestureHendler}>
        <Animated.View style={[styles.animatedCard, cardStyle]}>
          <Card user={currentProfile} />
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
    flex: 1,
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: -1,
  },
});

// Export the full file to use
export default App;
