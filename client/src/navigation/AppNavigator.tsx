import {NavigationContainer} from '@react-navigation/native';
import {useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import useAuthStore from '../store/useAuthStore';

export default function AppNavigator() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
