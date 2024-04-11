import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleComponent = () => {
  return <Text style={styles.title}>Pokedex</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TitleComponent;
