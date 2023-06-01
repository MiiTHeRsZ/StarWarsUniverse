import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Header from "../../Header";

import spaceBackground from '../../../../assets/imgs/space-background.jpg';

export default function PickedFilm({ route, navigation }) {
    const [contentFilm, setContentFilm] = useState(route.params);
    const episode = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX' };

    const [charactersData, setCharactersData] = useState([]);
    const [planetsData, setPlanetsData] = useState([]);
    const [starshipsData, setStarshipsData] = useState([]);
    const [vehiclesData, setVehiclesData] = useState([]);
    const [speciesData, setSpeciesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async (url) => {
            const data = await fetch(url).then((response) => response.json());
            return { url: data.url, name: data.name };
        };

        const charactersInfo = contentFilm.characters.map((url) => fetchInfo(url));
        Promise.all(charactersInfo)
            .then((info) => {
                setCharactersData(info);
            })
            .catch((error) => {
                console.log(error);
            });

        const planetsInfo = contentFilm.planets.map((url) => fetchInfo(url));
        Promise.all(planetsInfo)
            .then((info) => {
                setPlanetsData(info);
            })
            .catch((error) => {
                console.log(error);
            });

        const starshipsInfo = contentFilm.starships.map((url) => fetchInfo(url));
        Promise.all(starshipsInfo)
            .then((info) => {
                setStarshipsData(info);
            })
            .catch((error) => {
                console.log(error);
            });

        const vehiclesInfo = contentFilm.vehicles.map((url) => fetchInfo(url));
        Promise.all(vehiclesInfo)
            .then((info) => {
                setVehiclesData(info);
            })
            .catch((error) => {
                console.log(error);
            });

        const speciesInfo = contentFilm.species.map((url) => fetchInfo(url));
        Promise.all(speciesInfo)
            .then((info) => {
                setSpeciesData(info);
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
                <View style={styles.body}>
                    <SafeAreaView style={styles.innerBody}>
                        <ScrollView style={{ marginTop: 20 }}>
                            <Header navigation={navigation} />
                            <View style={styles.main}>
                                <Image
                                    source={{ uri: `https://starwars-visualguide.com/assets/img/films/${contentFilm.url.match(/\d+/)}.jpg` }}
                                    style={styles.imagePoster}
                                />
                                <View style={styles.content}>
                                    <Text style={styles.filmName}>Episode {episode[contentFilm.episode_id]}</Text>
                                    <Text style={styles.filmName}>{contentFilm.title}</Text>
                                    <View style={styles.contentTextSubtitle}>
                                        <Text style={styles.textSubtitle}>Release date: {contentFilm.release_date}</Text>
                                        <Text style={styles.textSubtitle}>Director: {contentFilm.director}</Text>
                                        <Text style={styles.textSubtitle}>Producer: {contentFilm.producer}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.textTitle}>Opening Crawl</Text>
                            <Text style={styles.openingCrawl}>{contentFilm.opening_crawl}</Text>

                            <Text style={styles.textTitle}>Related Characters</Text>
                            <View>
                                <FlatList
                                    data={charactersData}
                                    keyExtractor={(item) => item.url}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.relatedListItem}>
                                                <Image
                                                    source={{ uri: `https://starwars-visualguide.com/assets/img/people/${item.url.match(/\d+/)}.jpg` }}
                                                    style={styles.relatedImage}
                                                />
                                                <Text style={styles.relatedName}>{item.name}</Text>
                                            </View>
                                        );
                                    }}
                                    ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related characters</Text>}
                                    horizontal
                                    style={styles.relatedList}
                                />
                            </View>
                            <Text style={styles.textTitle}>Related Planets</Text>
                            <View>
                                <FlatList
                                    data={planetsData}
                                    keyExtractor={(item) => item.url}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.relatedListItem}>
                                                <Image
                                                    source={{ uri: `https://starwars-visualguide.com/assets/img/planets/${item.url.match(/\d+/)}.jpg` }}
                                                    style={styles.relatedImage}
                                                />
                                                <Text style={styles.relatedName}>{item.name}</Text>
                                            </View>
                                        );
                                    }}
                                    ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related planets</Text>}
                                    horizontal
                                    style={styles.relatedList}
                                />
                            </View>
                            <Text style={styles.textTitle}>Related Starships</Text>
                            <View>
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
                                    horizontal
                                    style={styles.relatedList}
                                />
                            </View>
                            <Text style={styles.textTitle}>Related Vehicles</Text>
                            <View>
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
                                    horizontal
                                    style={styles.relatedList}
                                />
                            </View>
                            <Text style={styles.textTitle}>Related Species</Text>
                            <View>
                                <FlatList
                                    data={speciesData}
                                    keyExtractor={(item) => item.url}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.relatedListItem}>
                                                <Image
                                                    source={{ uri: `https://starwars-visualguide.com/assets/img/species/${item.url.match(/\d+/)}.jpg` }}
                                                    style={styles.relatedImage}
                                                />
                                                <Text style={styles.relatedName}>{item.name}</Text>
                                            </View>
                                        );
                                    }}
                                    ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related staspeciesrships</Text>}
                                    horizontal
                                    style={styles.relatedList}
                                />
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#202020',
    },
    spaceBackground: {
        flex: 1,
        height: '100%',
        width: '100%'
    },

    body: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        alignContent: 'center',
    },

    innerBody: {
        paddingTop: 25
    },

    filmName: {
        color: '#FFF',
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    main: {
        flexDirection: 'row',
        height: 250,
        width: '100%',
        marginBottom: 45,
        marginTop: 20,
        justifyContent: 'space-between',

    },
    imagePoster: {
        height: 250,
        width: 175,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(221,185,0,.9)',
        alignSelf: 'center',
        objectFit: 'fill'

    },
    contentFilm: {
        alignSelf: 'center',
        height: 250,
        width: '41%',
        justifyContent: 'space-between'
    },
    textTitle: {
        color: '#FFF',
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap'
    },
    contentTextSubtitle: {
        flex: 1,
        backgroundColor: 'rgba(53, 53, 53, .9)',
        color: '#FFF',
        borderRadius: 15,
        padding: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,.5)',
        lineHeight: 25,
        justifyContent: "space-around"

    },
    textSubtitle: {
        color: '#FFF',
    },

    openingCrawl: {
        backgroundColor: 'rgba(53, 53, 53, .9)',
        color: '#FFF',
        borderRadius: 15,
        padding: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,.5)',
        lineHeight: 25,
    }
});