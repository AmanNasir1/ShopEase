import {NavigationContainer} from '@react-navigation/native';
import {useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
