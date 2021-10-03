import React from 'react';
import {Text, Image, View, StyleSheet, ImageBackground} from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';

// object for declired details for user


// Main app function
const App = () => {
  return (
    <View style={styles.pageContainer}>
      <Card user={users[0]}/>
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
});

// Export the full file to use
export default App;
