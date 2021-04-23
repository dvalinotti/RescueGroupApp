import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from './Card';
import BaseButton from './BaseButton';
import colors from '../styles/colors';
import { RG_API_KEY } from 'react-native-dotenv';
import { TouchableOpacity } from 'react-native-gesture-handler';

const headers = {
  Authorization: RG_API_KEY,
  'Content-Type': 'application/json',
};

const createStyleSheet = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    pageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    list: {
      flex: 1,
    },
    itemContent: {
      flex: 1,
      flexDirection: 'row',
    },
    itemThumbnail: {
      flex: 2,
      height: null,
    },
    itemDetails: {
      flex: 4,
      padding: 15,
      position: 'relative',
    },
    thumbnail: {
      flex: 1,
    },
    animalName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    animalDetails: {
      fontSize: 14,
      color: 'rgba(0, 0, 0, 0.8)',
      lineHeight: 16,
    },
    itemButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexWrap: 'nowrap',
      paddingRight: 15,
    },
    distanceText: {
      fontWeight: 'bold',
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 15,
    },
    loadingIndicator: {
      padding: 20,
    },
    loadingText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 0.7)',
    },
  });

function ListItem(props) {
  const { styles, onPressItem } = props;
  const {
    name,
    ageGroup,
    breedPrimary,
    sex,
    pictureThumbnailUrl,
    distance,
  } = props.data.attributes;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPressItem}>
      <Card>
        <View style={styles.itemContent}>
          <View style={styles.itemThumbnail}>
            <Image
              source={{ uri: pictureThumbnailUrl }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </View>
          <View style={styles.itemDetails}>
            {/* <View style={styles.thumbnailCurve}></View> */}
            <Text style={styles.animalName}>{name}</Text>
            <Text style={styles.animalDetails}>
              {ageGroup ? ageGroup + ' - ' : ''}
              {sex}
            </Text>
            <Text style={styles.animalDetails}>{breedPrimary}</Text>
          </View>
          <View style={styles.itemButtonContainer}>
            <Text style={styles.distanceText}>{Math.round(distance)} mi.</Text>
            <Ionicons
              name="arrow-forward-outline"
              size={35}
              color={colors.blue}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function AnimalList({ navigation, geolocation }) {
  /**
   * States
   */
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [data, setData] = useState(undefined);
  const [meta, setMeta] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState(undefined);

  /**
   * Other variable declarations
   */
  const theme = useTheme();
  const styles = createStyleSheet(theme.colors);

  /**
   * Functions
   */
  const openAnimalScreen = id =>
    navigation.navigate('Animal', {
      id,
    });

  const getAnimalPageData = useCallback(
    async (page = 1) => {
      const body = geolocation
        ? {
            data: {
              filters: [
                {
                  fieldName: 'statuses.name',
                  operation: 'equals',
                  criteria: 'Available',
                },
                {
                  fieldName: 'species.singular',
                  operation: 'equals',
                  criteria: 'Dog',
                },
                {
                  fieldName: 'species.singular',
                  operation: 'equals',
                  criteria: 'Cat',
                },
              ],
              filterProcessing: '1 AND (2 or 3)',
              filterRadius: {
                lat: geolocation.coords.latitude,
                lon: geolocation.coords.longitude,
                miles: 25,
              },
            },
          }
        : {};
      return fetch(
        `https://api.rescuegroups.org/v5/public/animals/search/available/?limit=25&page=${page}&sort=+animals.distance`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        },
      );
    },
    [geolocation],
  );

  const loadMore = () => {
    setPageLoading(true);
    const nextPage = pagesLoaded + 1;
    getAnimalPageData(nextPage)
      .then(res => res.json())
      .then(json => {
        const list = [...data, ...json.data];
        setData(list);
      })
      .catch(err => {
        console.log(err);
        setError(err.message);
      })
      .finally(() => {
        setPageLoading(false);
        setPagesLoaded(nextPage);
      });
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (!data) {
      getAnimalPageData(1)
        .then(res => res.json())
        .then(json => {
          setMeta(json.meta);
          setData(json.data);
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    }
  }, [data, getAnimalPageData]);

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      {loading && (
        <View style={styles.pageContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        </View>
      )}
      {data && (
        <SafeAreaView style={styles.list}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ListItem
                data={item}
                styles={styles}
                onPressItem={() => openAnimalScreen(item.id)}
              />
            )}
            ListFooterComponent={() => (
              <View style={styles.buttonContainer}>
                {pagesLoaded < meta.pages ? (
                  <View>
                    {pageLoading ? (
                      <ActivityIndicator size="small" />
                    ) : (
                      <BaseButton
                        title="Load more"
                        color="secondaryDark"
                        onPress={() => loadMore()}
                      />
                    )}
                  </View>
                ) : (
                  <Text>No more animals in your area!</Text>
                )}
              </View>
            )}
            keyExtractor={i => i.id}
          />
        </SafeAreaView>
      )}
    </View>
  );
}
