// src/navigations/HomeStackNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';

const Stack = createStackNavigator();

const HomeStackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      <Stack.Screen 
        name="MovieDetail" 
        component={MovieDetail}
        options={{ title: 'Movie Detail' }} // Ensure the title is set here
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
