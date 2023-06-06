import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../../Header';

import spaceBackground from '../../../../assets/imgs/space-background.jpg';

export default function PickedFilm({ route, navigation }) {
  const [contentPlanet, setContentPlanet] = useState(route.params);

  useEffect(() => {
    setContentPlanet(route.params);
  }, [route.params]);

  const [residentsData, setResidentsData] = useState([]);
  const [filmsData, setFilmsData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  function goPickedPeople(pickedPeople) {
    navigation.navigate('PickedPeople', pickedPeople);
  }

  function goPickedFilm(pickedFilm) {
    navigation.navigate('PickedFilm', pickedFilm);
  }

  useEffect(() => {
    const fetchInfo = async (url) => {
      const data = await fetch(url).then((response) => response.json());
      return data;
    };

    const residentsInfo = contentPlanet.residents.map((url) => fetchInfo(url));

    Promise.all(residentsInfo)
      .then((info) => {
        setResidentsData(info);
      })
      .catch((error) => {
        console.log(error);
      });

    const filmsInfo = contentPlanet.films.map((url) => fetchInfo(url));

    Promise.all(filmsInfo)
      .then((info) => {
        setFilmsData(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*  if (isLoading) {
         return (
             <View style={styles.loadingContainer}>
                 <ActivityIndicator size="large" color="#FFF" />
             </View>
         );
     } */

  return (
    <View style={styles.container}>
      <ImageBackground source={spaceBackground} style={styles.spaceBackground}>
        <SafeAreaView style={styles.innerBody}>
          <ScrollView style={{ marginTop: 20 }}>
            <Header navigation={navigation} />
            <View style={styles.main}>
              <Image
                source={{
                  uri: `https://starwars-visualguide.com/assets/img/planets/${contentPlanet.url.match(
                    /\d+/
                  )}.jpg`,
                }}
                defaultSource={{
                  uri: 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg',
                }}
                style={styles.imagePoster}
              />
              <View style={styles.content}>
                <Text style={styles.titleText}>{contentPlanet.name}</Text>
                <View style={styles.subtitleTextContent}>
                  <Text style={styles.subtitleText}>
                    Population: {contentPlanet.population}
                  </Text>
                  <Text style={styles.subtitleText}>
                    Rotation Period: {contentPlanet.rotation_period} days
                  </Text>
                  <Text style={styles.subtitleText}>
                    Orbital Period: {contentPlanet.orbital_period} days
                  </Text>
                  <Text style={styles.subtitleText}>
                    Diameter: {contentPlanet.diameter}km
                  </Text>
                  <Text style={styles.subtitleText}>
                    Gravity: {contentPlanet.gravity}
                  </Text>
                  <Text style={styles.subtitleText}>
                    Terrain: {contentPlanet.terrain}
                  </Text>
                  <Text style={styles.subtitleText}>
                    Climate: {contentPlanet.climate}
                  </Text>
                  <Text style={styles.subtitleText}>
                    Surface Water: {contentPlanet.surface_water}%
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.titleText}>Related Residents</Text>
            <View style={styles.related}>
              <FlatList
                data={residentsData}
                keyExtractor={(item) => item.url}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress={() => goPickedPeople(item)}>
                      <View style={styles.relatedListItem}>
                        <Image
                          source={{
                            uri: `https://starwars-visualguide.com/assets/img/characters/${item.url.match(
                              /\d+/
                            )}.jpg`,
                          }}
                          style={styles.relatedImage}
                        />
                        <Text style={styles.relatedName}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    There are no related residents
                  </Text>
                }
                horizontal
                style={styles.relatedList}
              />
            </View>
            <Text style={styles.titleText}>Related Films</Text>
            <View style={styles.related}>
              <FlatList
                data={filmsData}
                keyExtractor={(item) => item.url}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress={() => goPickedFilm(item)}>
                      <View style={styles.relatedListItem}>
                        <Image
                          source={{
                            uri: `https://starwars-visualguide.com/assets/img/films/${item.url.match(
                              /\d+/
                            )}.jpg`,
                          }}
                          style={styles.relatedImage}
                        />
                        <Text style={styles.relatedName}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    There are no related films
                  </Text>
                }
                horizontal
                style={styles.relatedList}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#202020',
  },
  spaceBackground: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  innerBody: {
    padding: 15,
  },
  main: {
    flexDirection: 'row',
    marginVertical: 20,
    marginTop: 40,
  },
  imagePoster: {
    height: 170,
    width: 170,
    borderRadius: 360 / 4,
    borderWidth: 2,
    borderColor: 'rgba(221,185,0,.9)',
    alignSelf: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    maxWidth: 180,
  },
  titleText: {
    color: '#FFF',
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleTextContent: {
    backgroundColor: 'rgba(92, 92, 92, .6)',
    color: '#FFF',
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,.5)',
    lineHeight: 25,
    justifyContent: 'space-around',
  },
  subtitleText: {
    color: '#FFF',
    lineHeight: 25,
  },
  related: {
    backgroundColor: 'rgba(53, 53, 53, .9)',
    color: '#FFF',
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,.5)',
    lineHeight: 25,
    marginBottom: 10,
  },
  relatedList: {
    textAlign: 'center',
  },
  relatedListItem: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 15,
    width: 90,
  },
  relatedImage: {
    borderRadius: 50,
    width: 60,
    height: 60,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(221,185,0,.9)',
  },
  relatedName: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    width: '75%',
  },
});
