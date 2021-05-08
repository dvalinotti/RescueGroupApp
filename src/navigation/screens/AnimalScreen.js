import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import HTML from 'react-native-render-html';
import { RG_API_KEY } from 'react-native-dotenv';
import Card from '../../components/Card';
import AnimalTitleCard from '../../components/AnimalTitleCard';
import CollapsibleList from '../../components/CollapsibleList';
import {
  HorizontalSlideTransition,
  VerticalSlideTransition,
} from '../../transitions';
import { formatDate, getInfoRowsFromData } from '../../functions/animals';
import BaseButton from '../../components/BaseButton';
import { colors } from '../../styles';

const headers = {
  Authorization: RG_API_KEY,
  'Content-Type': 'application/json',
};

export default function AnimalScreen({ navigation, route }) {
  const id = route.params.id;
  const [animalImage, setAnimalImage] = useState(undefined);
  const [attributes, setAttributes] = useState(undefined);
  const [included, setIncluded] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [imageLoaded, setImageLoaded] = useState(undefined);

  const getAnimalImage = json => {
    return json.included.filter(item => item.type === 'pictures')[0].attributes
      .original.url;
  };

  const openContactInfo = () => {
    navigation.navigate('Contact', {
      data: included,
    });
  };

  const openAdoptionUrl = () => {
    const filteredOrg = included.filter(item => item.type === 'orgs');
    const orgInfo = filteredOrg.length > 0 ? filteredOrg[0].attributes : {};
    const url = orgInfo.adoptionUrl;
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

  useEffect(() => {
    if (id && id !== '' && animalImage === undefined) {
      fetch(`https://api.rescuegroups.org/v5/public/animals/${id}`, {
        headers,
      })
        .then(res => res.json())
        .then(json => {
          if (json.data.length > 0) {
            setAttributes(json.data[0].attributes);
            setIncluded(json.included);
            const imageUrl = getAnimalImage(json);
            setAnimalImage(imageUrl);
          }
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false));
    }
  }, [id, animalImage]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {error && <Text>{error.message}</Text>}
      {loading && (
        <ActivityIndicator style={styles.loadingIndicator} size="large" />
      )}
      {attributes && (
        <ScrollView>
          <View style={styles.container}>
            {animalImage && (
              <View style={styles.heroBanner}>
                <Image
                  style={styles.heroBannerImage}
                  source={{ uri: animalImage }}
                  resizeMode="contain"
                  onLoadEnd={() => setImageLoaded(true)}
                />
                <Image
                  style={styles.heroBannerBackground}
                  source={{ uri: animalImage }}
                  resizeMode="cover"
                  blurRadius={25}
                  onLoadEnd={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <View style={styles.imageLoading}>
                    <ActivityIndicator size="large" color={colors.white} />
                  </View>
                )}
              </View>
            )}
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <VerticalSlideTransition
                  duration={250}
                  delay={200}
                  offset={50}
                  direction="up">
                  <AnimalTitleCard
                    name={attributes.name}
                    sex={attributes.sex}
                    age={attributes.ageString}
                    breed={attributes.breedPrimary}
                  />
                </VerticalSlideTransition>
              </View>
            </View>
            <View style={styles.cardContainer}>
              <HorizontalSlideTransition
                offset={50}
                duration={250}
                delay={500}
                direction="right">
                <Card>
                  <View style={styles.cardContent}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <View style={styles.divider} />
                    <HTML
                      source={{ html: attributes.descriptionHtml }}
                      ignoredStyles={[
                        'font-size',
                        'font-family',
                        'font-weight',
                        'color',
                        'transform',
                      ]}
                    />
                  </View>
                </Card>
              </HorizontalSlideTransition>
            </View>
            <View style={styles.cardContainer}>
              <HorizontalSlideTransition
                offset={50}
                duration={250}
                delay={350}
                direction="left">
                <CollapsibleList
                  items={[
                    {
                      title: 'Appearance',
                      content: (
                        <View style={{ paddingBottom: 10 }}>
                          {getInfoRowsFromData(
                            {
                              ...attributes,
                              birthDate: formatDate(attributes.birthDate),
                            },
                            'basicInfo',
                          )}
                        </View>
                      ),
                    },
                    {
                      title: 'Health & Behavior',
                      content: (
                        <View style={{ paddingBottom: 10 }}>
                          {getInfoRowsFromData(
                            {
                              ...attributes,
                            },
                            'behavior',
                          )}
                        </View>
                      ),
                    },
                  ]}
                />
              </HorizontalSlideTransition>
              <View style={{ paddingTop: 10 }}>
                <BaseButton
                  color="green"
                  title="Adoption Info"
                  onPress={() => openContactInfo()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  loadingIndicator: {
    padding: 30,
  },
  content: {
    flex: 1,
  },
  heroBanner: {
    flex: 1,
    height: 350,
    position: 'relative',
    backgroundColor: 'black',
  },
  heroBannerBackground: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: null,
    height: null,
    zIndex: 5,
    opacity: 0.65,
  },
  heroBannerImage: {
    flex: 1,
    zIndex: 10,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 10,
    transform: [
      {
        translateY: -30,
      },
    ],
  },
  card: {
    flex: 1,
    marginHorizontal: 25,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  cardContent: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
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
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  imageLoading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
