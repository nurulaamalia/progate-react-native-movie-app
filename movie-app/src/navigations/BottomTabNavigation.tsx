// src/navigations/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigation';
import SearchScreen from '../screens/Search';
import FavoriteScreen from '../screens/Favorite';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (): JSX.Element => (
  <Tab.Navigator>
    <Tab.Screen 
      name="HomeStack" 
      component={HomeStackNavigator} 
      options={{ headerShown: false }}
    />
    <Tab.Screen 
      name="Search" 
      component={SearchScreen} 
    />
    <Tab.Screen 
      name="Favorite" 
      component={FavoriteScreen} 
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
