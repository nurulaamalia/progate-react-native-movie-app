// src/screens/MovieDetail.tsx

import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { API_URL, API_ACCESS_TOKEN } from '@env';
import { MovieDetailScreenProps } from '../types/navigation';
import MovieItem from '../components/movies/MovieItem';
import { useFavorites } from '../context/FavoritesContext';
import { FontAwesome } from '@expo/vector-icons';

const MovieDetail = ({ route, navigation }: MovieDetailScreenProps): JSX.Element => {
  const { id } = route.params;
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some(movie => movie.id === id);

  useEffect(() => {
    fetchMovieDetails();
    fetchRecommendations();
  }, []);

  const fetchMovieDetails = async () => {
    const url = `${API_URL}/movie/${id}`;
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
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchRecommendations = async () => {
    const url = `${API_URL}/movie/${id}/recommendations`;
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
      setRecommendations(data.results);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(movieDetails);
    }
  };

  if (!movieDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.title}>{movieDetails.title}</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
          <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.tagline}>{movieDetails.tagline}</Text>
        <Text style={styles.overview}>{movieDetails.overview}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.details}>Release Date: {movieDetails.release_date}</Text>
          <Text style={styles.details}>Rating: {movieDetails.vote_average}</Text>
          <Text style={styles.details}>Language: {movieDetails.spoken_languages.map(lang => lang.english_name).join(', ')}</Text>
        </View>

        <Text style={styles.recommendationTitle}>Recommendation</Text>
        <FlatList
          horizontal
          data={recommendations}
          renderItem={({ item }) => (
            <MovieItem movie={item} size={{ width: 100, height: 160 }} coverType="poster" />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        />
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: 300,
    height: 450,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  detailsContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  details: {
    fontSize: 14,
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default MovieDetail;
