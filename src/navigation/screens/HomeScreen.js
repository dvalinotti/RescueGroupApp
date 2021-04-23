import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AnimalList from '../../components/AnimalList';

export default function HomeScreen({ navigation }) {
  const [geolocation, setGeolocation] = useState(undefined);

  useEffect(() => {
    if (!geolocation) {
      Geolocation.getCurrentPosition(info => {
        setGeolocation(info);
      });
    }
  }, [geolocation, setGeolocation]);

  return (
    <View style={styles.container}>
      {geolocation && (
        <AnimalList navigation={navigation} geolocation={geolocation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
  },
});
