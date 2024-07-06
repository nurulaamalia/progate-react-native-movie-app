// src/screens/Home.tsx

import React from 'react';
import { ScrollView, View, Text, StatusBar, StyleSheet } from 'react-native';
import type { MovieListProps } from '../types/app';
import MovieList from '../components/movies/MovieList';

const movieLists: MovieListProps[] = [
  {
    title: 'Now Playing in Theater',
    path: 'movie/now_playing?language=en-US&page=1',
    coverType: 'backdrop',
  },
  {
    title: 'Upcoming Movies',
    path: 'movie/upcoming?language=en-US&page=1',
    coverType: 'poster',
  },
  {
    title: 'Top Rated Movies',
    path: 'movie/top_rated?language=en-US&page=1',
    coverType: 'poster',
  },
  {
    title: 'Popular Movies',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
  },
];

const Home = (): JSX.Element => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {movieLists.map((movieList) => (
          <View key={movieList.title} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{movieList.title}</Text>
            <MovieList
              title={movieList.title}
              path={movieList.path}
              coverType={movieList.coverType}
            />
          </View>
        ))}
        <StatusBar translucent={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    paddingLeft: 8,
  },
});

export default Home;
