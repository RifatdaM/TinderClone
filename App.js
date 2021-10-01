import React from 'react';
import {Text, Image, View, StyleSheet, ImageBackground} from 'react-native';

// Main app function
const App = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <ImageBackground
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png',
          }}
          style={styles.imageContainer}>
          <View style={styles.cardInnerGap}>
            <Text style={styles.name}>Elon Mask</Text>
            <Text style={styles.bio}>
              A dude with a rocket is looking for a gal with fuel
            </Text>
          </View>
        </ImageBackground>
      </View>
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
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  card: {
    width: '90%',
    height: '60%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  bio: {
    marginTop: 10,
    fontSize: 18,
    color: 'white',
    fontWeight: '400',
    lineHeight: 25,
  },
  cardInnerGap: {
    padding: 10,
  },
});

// Export the full file to use
export default App;
