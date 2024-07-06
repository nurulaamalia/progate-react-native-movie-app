// src/screens/Favorite.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieItem from '../components/movies/MovieItem';
import type { Movie } from '../types/app';

const Favorite = (): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  const fetchFavoriteMovies = async () => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList');
      const movies: Movie[] = initialData ? JSON.parse(initialData) : [];
      setFavoriteMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  if (favoriteMovies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No favorite movies found.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {favoriteMovies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} size="large" coverType="poster" />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Favorite;
