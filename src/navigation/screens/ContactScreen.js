import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BaseButton from '../../components/BaseButton';
import Link from '../../components/Link';
import { colors } from '../../styles';

const screenWidth = Dimensions.get('window').width;

export default function ContactScreen({ navigation, route }) {
  const data = route.params.data;
  const filteredOrg = data.filter(item => item.type === 'orgs');
  const orgInfo = filteredOrg.length > 0 ? filteredOrg[0].attributes : {};
  const phoneLink = `tel:${orgInfo.phone}`;
  const emailLink = `mailto:${orgInfo.email}`;

  const formatAddress = () => {
    const text = `${orgInfo.street}, ${orgInfo.city}, ${orgInfo.state} ${orgInfo.postalcode}`;
    return {
      text,
      uri: encodeURI(text),
    };
  };

  const getMapsUrl = () => {
    const addr = formatAddress().uri;
    return `http://maps.apple.com/?address=${addr}`;
  };

  const openLink = url => {
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

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contact Information</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.row}>
              <Text style={styles.infoTitle}>Organization:</Text>
              <Text>{orgInfo.name}</Text>
            </View>
            {orgInfo.phone && (
              <View style={styles.row}>
                <Text style={styles.infoTitle}>Phone:</Text>
                <Link text={orgInfo.phone} url={phoneLink} />
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.infoTitle}>Email:</Text>
              <Link text={orgInfo.email} url={emailLink} />
            </View>
            <View style={styles.row}>
              <Text style={styles.infoTitle}>Website:</Text>
              <Link text={orgInfo.url} url={orgInfo.url} />
            </View>
            {orgInfo.street !== ' ' &&
              orgInfo.city !== ' ' &&
              orgInfo.state !== ' ' && (
                <View style={styles.row}>
                  <Text style={styles.infoTitle}>Address:</Text>
                  <Link text={formatAddress().text} url={getMapsUrl()} />
                </View>
              )}
            {orgInfo.about !== ' ' && (
              <View style={styles.row}>
                <Text style={styles.infoTitle}>About the Organization:</Text>
                <Text>{orgInfo.about}</Text>
              </View>
            )}
            {orgInfo.adoptionProcess !== ' ' && (
              <View style={styles.row}>
                <Text style={styles.infoTitle}>Adoption Process:</Text>
                <Text>{orgInfo.adoptionProcess}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonRow}>
        <LinearGradient
          style={styles.gradient}
          colors={['#ffffff00', '#f2f2f2']}
        />
        {orgInfo.phone && (
          <BaseButton
            size="large"
            color="green"
            title="Call"
            icon="call-outline"
            onPress={() => openLink(phoneLink)}
          />
        )}
        {orgInfo.email && (
          <BaseButton
            size="large"
            color="brightBlue"
            title="Email"
            icon="mail-outline"
            onPress={() => openLink(emailLink)}
          />
        )}
        <BaseButton
          size="large"
          color="pink"
          title="Location"
          icon="map-outline"
          onPress={() => openLink(getMapsUrl())}
        />
      </View>
      <BaseButton color="blue" onPress={closeModal} title="Close" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  row: {
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2.5,
  },
  infoValue: {
    textAlign: 'right',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative'
  },
  gradient: {
    width: screenWidth,
    height: 50,
    position: 'absolute',
    left: 0,
    top: -50,
    zIndex: 10,
  },
});
