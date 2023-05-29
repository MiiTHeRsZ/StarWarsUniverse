import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";

import Header from "../../Header";

import spaceBackground from '../../../../assets/imgs/space-background.jpg';

export default function PickedFilm({ route, navigation }) {
    const [contentStarship, setContentStarship] = useState(route.params);

    const [pilotsData, setPilotsData] = useState([]);
    const [filmsData, setFilmsData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async (url) => {
            const data = await fetch(url).then((response) => response.json());
            return { url: data.url, name: data.name };
        };

        const charactersInfo = contentStarship.pilots.map((url) => fetchInfo(url));

        Promise.all(charactersInfo)
            .then((info) => {
                setPilotsData(info);
            })
            .catch((error) => {
                console.log(error);
            });

        const fetchFilmInfo = async (url) => {
            const data = await fetch(url).then((response) => response.json());
            return { url: data.url, title: data.title };
        };

        const filmsInfo = contentStarship.films.map((url) => fetchFilmInfo(url));

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
                    <Header navigation={navigation} />
                    <View style={styles.main}>
                        <Image
                            source={{ uri: `https://starwars-visualguide.com/assets/img/starships/${contentStarship.url.match(/\d+/)}.jpg` }}
                            style={styles.imagePoster}
                        />
                        <View style={styles.content}>
                        <Text style={styles.titleText}>{contentStarship.name}</Text>
                            <View style={styles.subtitleTextContent}>
                                <Text style={styles.subtitleText}>Model: {contentStarship.model}</Text>
                                <Text style={styles.subtitleText}>Starship Class: {contentStarship.starship_class}</Text>
                                <Text style={styles.subtitleText}>Manufacturer: {contentStarship.manufacturer}</Text>
                                <Text style={styles.subtitleText}>Cost: {contentStarship.cost_in_credits} credits</Text>
                                <Text style={styles.subtitleText}>Max Atmosphering Speed: {contentStarship.max_atmosphering_speed}km/h</Text>
                                <Text style={styles.subtitleText}>Hyperdrive Rating: {contentStarship.hyperdrive_rating}</Text>
                                <Text style={styles.subtitleText}>MGLT: {contentStarship.MGLT}</Text>
                                <Text style={styles.subtitleText}>Crew: {contentStarship.crew}</Text>
                                <Text style={styles.subtitleText}>Passengers: {contentStarship.passengers}</Text>
                                <Text style={styles.subtitleText}>Cargo Capacity: {contentStarship.cargo_capacity}kg</Text>
                                <Text style={styles.subtitleText}>Length: {contentStarship.length}m</Text>
                                <Text style={styles.subtitleText}>Consumables: {contentStarship.consumables}</Text>
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
                                    <View style={styles.relatedListItem}>
                                        <Image
                                            source={{ uri: `https://starwars-visualguide.com/assets/img/people/${item.url.match(/\d+/)}.jpg` }}
                                            style={styles.relatedImage}
                                        />
                                        <Text style={styles.relatedName}>{item.name}</Text>
                                    </View>
                                );
                            }}
                            ListEmptyComponent={<Text style={{ color: 'white', fontSize: 20 }}>There are no related Pilots</Text>}
                            numColumns={3}
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