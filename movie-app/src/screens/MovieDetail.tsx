import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { API_URL, API_ACCESS_TOKEN } from '@env';

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params;
  const [movieDetails, setMovieDetails] = useState<any>(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

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
      console.log('======');
      console.log(`Fetched movie details for ID: ${id}`, data);
      console.log('+++++');
      setMovieDetails(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
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
        <Text style={styles.overview}>{movieDetails.overview}</Text>
        <Text style={{ fontSize: 30 }}>Movie ID: {id}</Text>
        <Text style={styles.details}>
          Release Date: {movieDetails.release_date}
        </Text>
        <Text style={styles.details}>
          Rating: {movieDetails.vote_average}
        </Text>
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
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  details: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default MovieDetail;
