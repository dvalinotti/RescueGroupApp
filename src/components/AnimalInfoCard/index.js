import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../Card';

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  divider: {
    flex: 1,
    marginVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.125)',
    width: '100%',
    height: 1,
  },
  aboutRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  aboutRowLabel: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.65)',
    fontStyle: 'italic',
  },
  details: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.85)',
  },
});

export default function AnimalInfoCard({ title, rows }) {
  return (
    <Card>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.divider} />
        {rows.map((row, index) => (
          <View style={styles.aboutRow} key={index}>
            <Text style={styles.aboutRowLabel}>{row.label}:</Text>
            <Text style={styles.details}>{row.value || 'Unknown'}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
