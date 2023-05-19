import React, { useState } from "react";
import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";

import Header from "../../Header";

import spaceBackground from '../../../../assets/imgs/space-background.jpg';

export default function PickedPeople({ navigation }, props) {
    const { pickedPeople } = props;
    const [contentPeople, setContentPeople] = useState({});

    async () => {
        fetch(pickedPeople)
            .then(response => response.json())
            .then(data => {
                setContentPeople(data);
            });
    };

    console.log(contentPeople);
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
                                <Text style={styles.textSubtitle}>Specie: {contentPeople.species[0]}</Text>
                                <Text style={styles.textSubtitle}>Gender: {contentPeople.gender}</Text>
                                <Text style={styles.textSubtitle}>Height: {contentPeople.height}cm</Text>
                                <Text style={styles.textSubtitle}>Mass: {contentPeople.mass}Kg</Text>
                                <Text style={styles.textSubtitle}>Homeworld: {contentPeople.homeworld}</Text>
                            </View>
                        </View>
                    </View>
                    <Text>Related Films</Text>
                    <View>
                        <FlatList
                            data={contentPeople.films}
                            renderItem={({ item }) => {
                                <View>
                                    <Image
                                        source={{ uri: `https://starwars-visualguide.com/assets/img/films/${item.match(/\d+/)}.jpg` }}
                                    />
                                    <Text>{/* Colocar o nome do filme */}</Text>
                                </View>
                            }}
                        />
                    </View>
                    <Text>Related Starships</Text>
                    <View>
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
                        />
                    </View>
                    <Text>Related Vehicles</Text>
                    <View>
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
                        />
                    </View>
                </SafeAreaView>
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
});