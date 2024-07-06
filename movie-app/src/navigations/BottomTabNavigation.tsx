// src/navigations/BottomTabNavigation.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigation';
import SearchScreen from '../screens/Search';
import FavoriteScreen from '../screens/Favorite';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStackNavigator} 
        options={{ 
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Favorite" 
        component={FavoriteScreen} 
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
