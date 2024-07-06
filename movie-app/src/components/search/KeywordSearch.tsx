import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MovieItem from '../movies/MovieItem';
import { API_URL, API_ACCESS_TOKEN } from '@env';

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState<any[]>([]);

  const fetchMovies = async (query: string) => {
    try {
      const url = `${API_URL}/search/movie?query=${query}`;
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

  const handleSearch = () => {
    if (keyword.trim()) {
      fetchMovies(keyword);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for movies..."
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#8978A4',
    padding: 8,
    borderRadius: 8,
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

export default KeywordSearch;
