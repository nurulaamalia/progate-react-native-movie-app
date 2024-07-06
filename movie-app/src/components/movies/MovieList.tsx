// src/components/movies/MovieList.tsx

import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import MovieItem from './MovieItem';
import { API_URL, API_ACCESS_TOKEN } from '@env';

interface MovieListProps {
  title: string;
  path: string;
  coverType: 'poster' | 'backdrop';
}

const MovieList = ({ path, coverType }: MovieListProps): JSX.Element => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const url = `${API_URL}/${path}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={movies}
        renderItem={({ item }) => (
          <MovieItem movie={item} size={{ width: 100, height: 160 }} coverType={coverType} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MovieList;
