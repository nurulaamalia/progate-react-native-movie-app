// src/components/movies/MovieItem.tsx

import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity, 
} from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import type { MovieItemProps } from '../../types/app';

const MovieItem = ({ movie, size, coverType }: MovieItemProps): JSX.Element => {
  const navigation = useNavigation();
  const pushAction = StackActions.push('MovieDetail', { id: movie.id });

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(pushAction);
      }}
    >
      <ImageBackground
        resizeMode="cover"
        style={[size, styles.backgroundImage]}
        imageStyle={styles.backgroundImageStyle}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${
            coverType === 'backdrop' ? movie.backdrop_path : movie.poster_path
          }`,
        }}
      >
        <View style={styles.gradientStyle}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    marginRight: 4,
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
  },
});

export default MovieItem;
