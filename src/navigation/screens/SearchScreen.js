import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SearchScreen(props) {
  const [distance, setDistance] = useState(undefined);
  const [species, setSpecies] = useState('any');
  const [ageGroup, setAgeGroup] = useState('any');

  console.log({
    distance,
    species,
  });

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Find the perfect pet for you!</Text>
        {/* <Text>{selected}</Text> */}
        <View style={styles.formContainer}>
          <View style={styles.selectContainer}>
            <Text style={styles.selectLabel}>Distance</Text>
            <RNPickerSelect
              onValueChange={value => setDistance(value)}
              Icon={() => {
                return <Ionicons name="chevron-down" size={24} color="gray" />;
              }}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerStyles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              items={[
                { label: '1mi', value: 1 },
                { label: '5mi', value: 5 },
                { label: '10mi', value: 10 },
                { label: '25mi', value: 25 },
                { label: '50mi', value: 50 },
              ]}
            />
          </View>
          <View style={styles.selectContainer}>
            <Text style={styles.selectLabel}>Species</Text>
            <RNPickerSelect
              onValueChange={value => setSpecies(value)}
              Icon={() => {
                return <Ionicons name="chevron-down" size={24} color="gray" />;
              }}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerStyles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              placeholder={{
                label: 'Any',
                value: 'any',
                color: '#000',
              }}
              items={[
                { label: 'Dogs', value: 'dog' },
                { label: 'Cats', value: 'cats' },
              ]}
            />
          </View>
          <View style={styles.selectContainer}>
            <Text style={styles.selectLabel}>Age Group</Text>
            <RNPickerSelect
              onValueChange={value => setAgeGroup(value)}
              Icon={() => {
                return <Ionicons name="chevron-down" size={24} color="gray" />;
              }}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerStyles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              placeholder={{
                label: 'Any',
                value: 'any',
                color: '#000',
              }}
              items={[
                { label: 'Baby', value: 'baby' },
                { label: 'Young adult', value: 'youngAdult' },
                { label: 'Adult', value: 'adult' },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 10,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0d0d0d',
  },
  selectContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  selectLabel: {
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 5,
  },
});

const pickerStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowRadius: 0,
    color: colors.black,
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: colors.white,
  },
};
