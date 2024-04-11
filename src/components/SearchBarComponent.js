import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const SearchBarComponent = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search Pokemon"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default SearchBarComponent;
