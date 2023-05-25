import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";

import Header from "../../Header";

import spaceBackground from '../../../../assets/imgs/space-background.jpg';

export default function PickedPeople({ route, navigation }) {
    const [contentPeople, setContentPeople] = useState(route.params);

    const [speciesName, setSpeciesName] = useState('Unknown');
    const [homeworldName, setHomeworldName] = useState('Unknown');

    const [filmsData, setFilmsData] = useState([]);
    const [starshipsData, setStarshipsData] = useState([]);
    const [vehiclesData, setVehiclesData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSpeciesName = async () => {
            if (contentPeople.species.length > 0) {
                await fetch(contentPeople.species[0])
                    .then(response => response.json())
                    .then(data => setSpeciesName(data.name));
            }
        };

        const fetchHomeworldName = async () => {
            await fetch(contentPeople.homeworld)
                .then(response => response.json())
                .then(data => setHomeworldName(data.name));
        };

        fetchSpeciesName();
        fetchHomeworldName();
    }, []);

    useEffect(() => {
        const fetchFilmInfo = async (url) => {
            const data = await fetch(url).then((response) => response.json());
            return { url: data.url, title: data.title };
        };

        const filmsInfo = contentPeople.films.map((url) => fetchFilmInfo(url));

        Promise.all(filmsInfo)
            .then((info) => {
                setFilmsData(info);
            })
            .catch((error) => {
                console.log(error);
            });

        const fetchStarshipsInfo = async (url) => {
            const data = await fetch(url).then((response) => response.json());
            return { url: data.url, title: data.name };
        };

        const starshipsInfo = contentPeople.starships.map((url) => fetchStarshipsInfo(url));

        Promise.all(starshipsInfo)
            .then((info) => {
                setStarshipsData(info);
            })
            .catch((error) => {
                console.log(error);
            });

        const fetchVehiclesInfo = async (url) => {
            const data = await fetch(url).then((response) => response.json());
            return { url: data.url, title: data.name };
        };

        const vehiclesInfo = contentPeople.vehicles.map((url) => fetchVehiclesInfo(url));

        Promise.all(vehiclesInfo)
            .then((info) => {
                setVehiclesData(info);
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
                    <Header navigation={navigation} />
                    <View style={styles.main}>
                        <Image
                            source={{ uri: `https://starwars-visualguide.com/assets/img/characters/${contentPeople.url.match(/\d+/)}.jpg` }}
                            style={styles.imagePoster}
                        />
                        <View style={styles.contentFilm}>
                            <Text style={styles.textTitle}>{contentPeople.name}</Text>
                            <View style={styles.contentTextSubtitle}>
                                <Text style={styles.textSubtitle}>Birth Year: {contentPeople.birth_year}</Text>
                                <Text style={styles.textSubtitle}>Specie: {speciesName}</Text>
                                <Text style={styles.textSubtitle}>Gender: {contentPeople.gender}</Text>
                                <Text style={styles.textSubtitle}>Height: {contentPeople.height}cm</Text>
                                <Text style={styles.textSubtitle}>Mass: {contentPeople.mass}Kg</Text>
                                <Text style={styles.textSubtitle}>Homeworld: {homeworldName}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.textTitle}>Related Films</Text>
                    <View style={styles.related}>
                        <FlatList
                            data={filmsData}
                            keyExtractor={(item) => item.url}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.relatedListItem}>
                                        <Image
                                            source={{ uri: `https://starwars-visualguide.com/assets/img/films/${item.url.match(/\d+/)}.jpg` }}
                                            style={styles.imageRelated}
                                        />
                                        <Text style={styles.nameRelated}>{item.title}</Text>
                                    </View>
                                );
                            }}
                            ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related starships</Text>}
                            numColumns={3}
                            style={styles.relatedList}
                        />
                    </View>
                    <Text style={styles.textTitle}>Related Starships</Text>
                    <View style={styles.related}>
                        <FlatList
                            data={starshipsData}
                            keyExtractor={(item) => item.url}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.relatedListItem}>
                                        <Image
                                            source={{ uri: `https://starwars-visualguide.com/assets/img/starships/${item.url.match(/\d+/)}.jpg` }}
                                            style={styles.imageRelated}
                                        />
                                        <Text style={styles.nameRelated}>{item.name}</Text>
                                    </View>
                                );
                            }}
                            ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related starships</Text>}
                            numColumns={3}
                            style={styles.relatedList}
                        />
                    </View>
                    <Text style={styles.textTitle}>Related Vehicles</Text>
                    <View style={styles.related}>
                        <FlatList
                            data={vehiclesData}
                            keyExtractor={(item) => item.url}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.relatedListItem}>
                                        <Image
                                            source={{ uri: `https://starwars-visualguide.com/assets/img/vehicles/${item.url.match(/\d+/)}.jpg` }}
                                            style={styles.imageRelated}
                                        />
                                        <Text style={styles.nameRelated}>{item.name}</Text>
                                    </View>
                                );
                            }}
                            ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related starships</Text>}
                            numColumns={3}
                            style={styles.relatedList}
                        />
                    </View>
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
        padding: 25,
    },
    main: {
        flexDirection: 'row',
        
        marginVertical: 20,
    },
    imagePoster: {
        height: 245,
        width: 170,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(221,185,0,.9)',
        
    },
    contentFilm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        maxWidth: 184,
        
        
    },
    textTitle: {
        color: '#FFF',
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    contentTextSubtitle: {
        backgroundColor: 'rgba(92, 92, 92, .6)',
        color: '#FFF',
        borderRadius: 15,
        padding: 10,
    },
    textSubtitle: {
        color: '#FFF',
        lineHeight:25
    },
    related: {
        backgroundColor: 'rgba(92, 92, 92, .8)',
        borderWidth: 2,
        borderColor: '#5C5C5C',
        borderRadius: 25,
    },
    relatedList: {
        textAlign: 'center',
    },
    relatedListItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: 80,
    },
    imageRelated: {
        borderRadius: 50,
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    nameRelated: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
    },
});

