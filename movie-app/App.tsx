// src/App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './src/navigations/BottomTabNavigation';
import { FavoritesProvider } from './src/context/FavoritesContext';

const App = (): JSX.Element => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
