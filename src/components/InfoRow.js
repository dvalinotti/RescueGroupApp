import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  aboutRow: {
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

export default function InfoRow({ label, value }) {
  return (
    <View style={styles.aboutRow}>
      <Text style={styles.aboutRowLabel}>{label}:</Text>
      <Text style={styles.details}>{value || 'Unknown'}</Text>
    </View>
  );
}
