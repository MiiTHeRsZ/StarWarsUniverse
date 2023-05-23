import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";

import Header from "../../Header";

import spaceBackground from '../../../../assets/imgs/space-background.jpg';

export default function PickedPeople({ route, navigation }) {
    const [contentPeople, setContentPeople] = useState(route.params);

    const [speciesName, setSpeciesName] = useState('Unknown');
    const [homeworldName, setHomeworldName] = useState('Unknown');

    const [filmsData, setFilmsData] = useState([]);

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
        const fetchInfoFilm = async (url) => {
            const data = await fetch(url).then((response) => response.json());
            return { url: data.url, title: data.title };
        };

        const infoFilms = contentPeople.films.map((url) => fetchInfoFilm(url));

        Promise.all(infoFilms)
            .then((info) => {
                setFilmsData(info);
                setIsLoading(!isLoading);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(!isLoading);
            });
    }, []);

    const relatedList = () => {
        if (filmsData.length != 0) {
            return (
                <View>
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
                        numColumns={5}
                        style={styles.relatedList}
                    />
                </View>
            );
        } else {
            return (
                <Text style={{ color: 'white', fontSize: 20 }}>There are no related films</Text>
            );
        }
    }

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
                        {relatedList()}
                    </View>
                    <Text style={styles.textTitle}>Related Starships</Text>
                    <View style={styles.related}>
                        <FlatList
                            data={contentPeople.starships}
                            renderItem={({ item }) => {
                                <View>
                                    <Image
                                        source={{ uri: `https://starwars-visualguide.com/assets/img/starships/${item.match(/\d+/)}.jpg` }}
                                    />
                                    <Text>{/* Colocar o nome do espaçonave */}</Text>
                                </View>
                            }}
                            keyExtractor={(item) => item.url}
                        />
                    </View>
                    <Text style={styles.textTitle}>Related Vehicles</Text>
                    <View style={styles.related}>
                        <FlatList
                            data={contentPeople.vehicles}
                            renderItem={({ item }) => {
                                <View>
                                    <Image
                                        source={{ uri: `https://starwars-visualguide.com/assets/img/vehicles/${item.match(/\d+/)}.jpg` }}
                                    />
                                    <Text>{/* Colocar o nome do veículo */}</Text>
                                </View>
                            }}
                            keyExtractor={(item) => item.url}
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
        alignItems: 'center',
        marginTop: 20,
    },
    imagePoster: {
        height: 245,
        width: 170,
        borderRadius: 5,
    },
    contentFilm: {
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
    },
    related: {
        padding: 15,
        backgroundColor: 'rgba(92, 92, 92, .6)',
        
    },
    relatedList: {
        textAlign: 'center',
    },
    relatedListItem: {
        width: 80,
        padding: 5
    },
    imageRelated: {
        borderRadius: 50,
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    nameRelated: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

