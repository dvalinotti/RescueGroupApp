import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  contentCenter: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.85)',
  },
});

export default function AnimalTitleCard({ name, sex, age, breed }) {
  return (
    <View>
      <Card>
        <View style={[styles.cardContent, styles.contentCenter]}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.details}>
            {sex}
            {' • '}
            {age}
          </Text>
          <Text style={styles.details}>{breed}</Text>
        </View>
      </Card>
    </View>
  );
}
