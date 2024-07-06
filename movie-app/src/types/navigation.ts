// src/types/navigation.ts

import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  MovieDetail: { id: number };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type MovieDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;
