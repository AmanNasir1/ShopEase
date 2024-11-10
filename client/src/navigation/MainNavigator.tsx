import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import Icon from 'react-native-vector-icons/Feather';
import SearchScreen from '../screens/search';
import SavedScreen from '../screens/saved-screen';
import CartScreen from '../screens/cart-screen';
import MyAccountScreen from '../screens/my-account';
const MainNavigator = () => {
  const Tab = createBottomTabNavigator();
  const getTabBarIcon =
    (iconName: string) =>
    ({focused}: {focused: boolean}) =>
      <Icon name={iconName} size={25} color={focused ? 'black' : 'grey'} />;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: 'grey',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: getTabBarIcon('home'),

          headerShown: false,
          tabBarActiveTintColor: 'black',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: getTabBarIcon('search'),
          headerShown: false,
          tabBarActiveTintColor: 'black',
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: getTabBarIcon('heart'),
          headerShown: false,
          tabBarActiveTintColor: 'black',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: getTabBarIcon('shopping-cart'),
          headerShown: false,
          tabBarActiveTintColor: 'black',
        }}
      />
      <Tab.Screen
        name="Account"
        component={MyAccountScreen}
        options={{
          tabBarIcon: getTabBarIcon('user'),
          headerShown: false,
          tabBarActiveTintColor: 'black',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
