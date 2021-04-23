import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Linking } from 'react-native';
import { colors } from '../styles';

export default function Link(props) {
  const { text, url, type } = props;
  const openLink = () => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log('Failed to open ' + url);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <TouchableOpacity onPress={openLink} activeOpacity={0.5}>
      <Text style={{ color: colors.blue }}>{text}</Text>
    </TouchableOpacity>
  );
}
