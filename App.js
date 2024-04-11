import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList, Image, Dimensions, Text, ActivityIndicator, TextInput } from 'react-native';
import TitleComponent from './src/components/TitleComponent';
import SearchBarComponent from './src/components/SearchBarComponent';

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results);
        setFilteredPokemon(data.results);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const numColumns = 2;
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth / numColumns - 20;

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = pokemon.filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
    setFilteredPokemon(filtered);
  };

  const renderPokemonCard = ({ item }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('./assets/pokedex_logo.png')} style={styles.logo} />
      <TextInput
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Buscar Pokémon"
        placeholderTextColor="#ff0000"
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff0000" />
        </View>
      ) : (
        <FlatList
          data={filteredPokemon}
          renderItem={renderPokemonCard} 
          keyExtractor={item => item.name}
          numColumns={numColumns}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcb05',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 40, 
  },
  flatListContainer: {
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20, 
  },
  searchBar: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    paddingLeft: 10,
    marginBottom: 20, 
    borderWidth: 1,
    borderColor: '#ff0000', 
    borderRadius: 5,
  },
});
