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
                        <View style={styles.content}>
                            <Text style={styles.titleText}>{contentPeople.name}</Text>
                            <View style={styles.subtitleTextContent}>
                                <Text style={styles.subtitleText}>Birth Year: {contentPeople.birth_year}</Text>
                                <Text style={styles.subtitleText}>Specie: {speciesName}</Text>
                                <Text style={styles.subtitleText}>Gender: {contentPeople.gender}</Text>
                                <Text style={styles.subtitleText}>Height: {contentPeople.height}cm</Text>
                                <Text style={styles.subtitleText}>Mass: {contentPeople.mass}Kg</Text>
                                <Text style={styles.subtitleText}>Homeworld: {homeworldName}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.titleText}>Related Films</Text>
                    <View style={styles.related}>
                        <FlatList
                            data={filmsData}
                            keyExtractor={(item) => item.url}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.relatedListItem}>
                                        <Image
                                            source={{ uri: `https://starwars-visualguide.com/assets/img/films/${item.url.match(/\d+/)}.jpg` }}
                                            style={styles.relatedImage}
                                        />
                                        <Text style={styles.relatedName}>{item.title}</Text>
                                    </View>
                                );
                            }}
                            ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related films</Text>}
                            numColumns={3}
                            style={styles.relatedList}
                        />
                    </View>
                    <Text style={styles.titleText}>Related Starships</Text>
                    <View style={styles.related}>
                        <FlatList
                            data={starshipsData}
                            keyExtractor={(item) => item.url}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.relatedListItem}>
                                        <Image
                                            source={{ uri: `https://starwars-visualguide.com/assets/img/starships/${item.url.match(/\d+/)}.jpg` }}
                                            style={styles.relatedImage}
                                        />
                                        <Text style={styles.relatedName}>{item.name}</Text>
                                    </View>
                                );
                            }}
                            ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related starships</Text>}
                            numColumns={3}
                            style={styles.relatedList}
                        />
                    </View>
                    <Text style={styles.titleText}>Related Vehicles</Text>
                    <View style={styles.related}>
                        <FlatList
                            data={vehiclesData}
                            keyExtractor={(item) => item.url}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.relatedListItem}>
                                        <Image
                                            source={{ uri: `https://starwars-visualguide.com/assets/img/vehicles/${item.url.match(/\d+/)}.jpg` }}
                                            style={styles.relatedImage}
                                        />
                                        <Text style={styles.relatedName}>{item.name}</Text>
                                    </View>
                                );
                            }}
                            ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related vehicles</Text>}
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
        padding: 15,
    },
    main: {
        flexDirection: 'row',
        marginVertical: 20,
        height: 260,
        marginTop: 40,
    },
    imagePoster: {
        height: 250,
        width: 170,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(221,185,0,.9)',
        alignSelf:'flex-end',
        objectFit: 'fill'
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
        padding: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,.5)',
        lineHeight: 25,
        justifyContent: "space-around"
    },
    subtitleText: {
        color: '#FFF',
        lineHeight: 25
    },
    related: {
        backgroundColor: 'rgba(53, 53, 53, .9)',
        color: '#FFF',
        borderRadius: 15,
        padding: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,.5)',
        lineHeight: 25,
        marginBottom:10
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
    relatedImage: {
        borderRadius: 50,
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    relatedName: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
    },
});

