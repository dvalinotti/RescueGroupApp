import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card(props) {
  const theme = useTheme();
  const styles = createStyleSheet(theme.colors);

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const createStyleSheet = colors =>
  StyleSheet.create({
    card: {
      flex: 1,
      margin: 10,
      backgroundColor: colors.card,
      shadowColor: '#00000066',
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.4,
      shadowRadius: 0,
      elevation: 8,
    },
    cardContent: {
      overflow: 'hidden',
      borderRadius: 10,
    },
  });
