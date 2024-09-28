import {View, Text, Platform} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';


const App = () => {

  
useEffect(() => {
  if (Platform.OS === 'android') SplashScreen.hide();
}, []);

  return (
  <AppNavigator />
  );
};

export default App;
