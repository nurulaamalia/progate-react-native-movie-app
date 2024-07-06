import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { API_URL, API_ACCESS_TOKEN } from '@env';
import MovieItem from '../movies/MovieItem';

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const url = `${API_URL}/genre/movie/list`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchMoviesByGenre = async (genreId: number) => {
    try {
      const url = `${API_URL}/discover/movie?with_genres=${genreId}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenre(genreId);
    fetchMoviesByGenre(genreId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={genres}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.genreButton,
              selectedGenre === item.id && styles.selectedGenreButton,
            ]}
            onPress={() => handleGenreSelect(item.id)}
          >
            <Text style={styles.genreText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genreList}
      />
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={movies}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <MovieItem movie={item} size={{ width: 100, height: 160 }} coverType="poster" />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  genreList: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  genreButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#C0B4D5',
    marginRight: 8,
  },
  selectedGenreButton: {
    backgroundColor: '#8978A4',
  },
  genreText: {
    color: 'white',
  },
  listContainer: {
    paddingVertical: 16,
  },
  movieItem: {
    flex: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default CategorySearch;
