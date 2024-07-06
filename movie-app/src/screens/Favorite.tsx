// src/screens/Favorite.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Favorite = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Favorite Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Favorite;
