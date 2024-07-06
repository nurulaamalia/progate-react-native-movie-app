// src/context/FavoritesContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../types/app';

type FavoritesContextType = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  React.useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('@FavoriteList');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };

    loadFavorites();
  }, []);

  const addFavorite = async (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    await AsyncStorage.setItem('@FavoriteList', JSON.stringify(newFavorites));
  };

  const removeFavorite = async (id: number) => {
    const newFavorites = favorites.filter(movie => movie.id !== id);
    setFavorites(newFavorites);
    await AsyncStorage.setItem('@FavoriteList', JSON.stringify(newFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
