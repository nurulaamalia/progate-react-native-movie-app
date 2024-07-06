import React from 'react';
import { Text, View } from 'react-native';

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params;

  console.log(`Received Movie ID: ${id}`);

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 32,
      }}
    >
      <Text style={{ fontSize: 30 }}>Movie ID: {id}</Text>
    </View>
  );
};

export default MovieDetail;
