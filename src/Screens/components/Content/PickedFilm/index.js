import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";

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
                <SafeAreaView style={styles.innerBody}>
                    <Header navigation={navigation} />
                    <View style={styles.main}>
                        <Image
                            source={{ uri: `https://starwars-visualguide.com/assets/img/films/${contentFilm.url.match(/\d+/)}.jpg` }}
                            style={styles.imagePoster}
                        />
                        <View style={styles.content}>
                            <Text style={styles.titleText}>{contentFilm.title}</Text>
                            <View style={styles.subtitleTextContent}>
                                <Text style={styles.subtitleText}>Episode {episode[contentFilm.episode_id]}</Text>
                                <Text style={styles.subtitleText}>Release date: {contentFilm.release_date}</Text>
                                <Text style={styles.subtitleText}>Director: {contentFilm.director}</Text>
                                <Text style={styles.subtitleText}>Producer: {contentFilm.producer}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.titleText}>Opening Crawl</Text>
                    <View style={styles.related}>
                        <Text style={styles.subtitleTextContent}>{contentFilm.opening_crawl}</Text>
                    </View>
                    <Text style={styles.titleText}>Related Characters</Text>
                    <View style={styles.related}>
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
                            numColumns={3}
                            style={styles.relatedList}
                        />
                    </View>
                    <Text style={styles.titleText}>Related Planets</Text>
                    <View style={styles.related}>
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
                    <Text style={styles.titleText}>Related Species</Text>
                    <View style={styles.related}>
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
        alignItems: 'center',
    },
    imagePoster: {
        height: 245,
        width: 170,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(221,185,0,.9)',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        maxWidth: 184,
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
    },
    subtitleText: {
        color: '#FFF',
        lineHeight: 25
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