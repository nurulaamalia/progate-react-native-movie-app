// src/screens/Favorite.tsx

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import MovieItem from '../components/movies/MovieItem';
import { useFavorites } from '../context/FavoritesContext';

const Favorite = (): JSX.Element => {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite movies yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <MovieItem movie={item} size={{ width: 100, height: 160 }} coverType="poster" />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={3}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default Favorite;
