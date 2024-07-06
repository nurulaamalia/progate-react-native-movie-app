import React, { useEffect, useState } from 'react';
import { ScrollView, View, StatusBar, StyleSheet } from 'react-native';
import { API_URL, API_ACCESS_TOKEN } from '@env';
import type { Movie } from '../types/app';
import MovieList from '../components/movies/MovieList';

const movieCategories: { title: string; path: string; coverType: 'poster' | 'backdrop'; }[] = [
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
  const [movies, setMovies] = useState<{ [key: string]: Movie[] }>({});

  useEffect(() => {
    movieCategories.forEach((category) => {
      fetchMovies(category.path, category.title);
    });
  }, []);

  const fetchMovies = async (path: string, category: string) => {
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
      setMovies((prevState) => ({
        ...prevState,
        [category]: data.results,
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {movieCategories.map((category) => (
          <MovieList
            key={category.title}
            title={category.title}
            path={category.path}
            coverType={category.coverType}
          />
        ))}
        <StatusBar translucent={false} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
});

export default Home;
