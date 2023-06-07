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

export default function PickedVehicle({ route, navigation }) {
  const [contentVehicle, setContentVehicle] = useState(route.params);

  useEffect(() => {
    setContentVehicle(route.params);
  }, [route.params]);

  const [pilotsData, setPilotsData] = useState([]);
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

    const charactersInfo = contentVehicle.pilots.map((url) => fetchInfo(url));

    Promise.all(charactersInfo)
      .then((info) => {
        setPilotsData(info);
      })
      .catch((error) => {
        console.log(error);
      });

    const filmsInfo = contentVehicle.films.map((url) => fetchInfo(url));

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
                    uri: `https://starwars-visualguide.com/assets/img/vehicles/${contentVehicle.url.match(
                      /\d+/
                    )}.jpg`,
                  }}
                  style={styles.imagePoster}
                />
                <View style={styles.content}>
                  <Text style={styles.titleText}>{contentVehicle.name}</Text>
                  <View style={styles.subtitleTextContent}>
                    <Text style={styles.subtitleText}>
                      Model: {contentVehicle.model}
                    </Text>
                    <Text style={styles.subtitleText}>
                      Vehicle Class: {contentVehicle.vehicle_class}
                    </Text>
                    <Text style={styles.subtitleText}>
                      Manufacturer: {contentVehicle.manufacturer}
                    </Text>
                    <Text style={styles.subtitleText}>
                      Cost: {contentVehicle.cost_in_credits} credits
                    </Text>
                    <Text style={styles.subtitleText}>
                      Max Atmosphering Speed:{' '}
                      {contentVehicle.max_atmosphering_speed}km/h
                    </Text>
                    <Text style={styles.subtitleText}>
                      Crew: {contentVehicle.crew}
                    </Text>
                    <Text style={styles.subtitleText}>
                      Passengers: {contentVehicle.passengers}
                    </Text>
                    <Text style={styles.subtitleText}>
                      Cargo Capacity: {contentVehicle.cargo_capacity}kg
                    </Text>
                    <Text style={styles.subtitleText}>
                      Length: {contentVehicle.length}m
                    </Text>
                    <Text style={styles.subtitleText}>
                      Consumables: {contentVehicle.consumables}
                    </Text>
                  </View>
                </View>
              </View>
            <Text style={styles.titleText}>Related Pilots</Text>
            <View style={styles.related}>
              <FlatList
                data={pilotsData}
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
                    There are no related pilots
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
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 20,
    height: 600,
    marginTop: 40,
  },
  imagePoster: {
    height: '40%',
    width: '100%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(221,185,0,.9)',
    alignSelf: 'center',
    objectFit: 'fill',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
  },
  titleText: {
    color: '#FFF',
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center'
  },
  subtitleTextContent: {
    backgroundColor: 'rgba(92, 92, 92, .6)',
    color: '#FFF',
    borderRadius: 15,
    padding: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,.5)',
    lineHeight: 25,
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly'
  },
  subtitleText: {
    color: '#FFF',

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
