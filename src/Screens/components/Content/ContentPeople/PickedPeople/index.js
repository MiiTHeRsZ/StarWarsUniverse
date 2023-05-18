import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const PickedPeople = () => {
    const dadosTestePeople = {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.dev/api/planets/1/",
        "films": [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/6/"
        ],
        "species": [],
        "vehicles": [
            "https://swapi.dev/api/vehicles/14/",
            "https://swapi.dev/api/vehicles/30/"
        ],
        "starships": [
            "https://swapi.dev/api/starships/12/",
            "https://swapi.dev/api/starships/22/"
        ],
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.dev/api/people/1/"
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image
                    source={{ uri: `https://starwars-visualguide.com/assets/img/characters/${dadosTestePeople.url.match(/\d+/)}.jpg` }}
                    style={styles.imagePoster}
                />
                <View style={styles.contentFilm}>
                    <Text style={styles.textTitle}>{dadosTestePeople.name}</Text>
                    <View style={styles.contentTextSubtitle}>
                        <Text style={styles.textSubtitle}>Birth Year: {dadosTestePeople.birth_year}</Text>
                        <Text style={styles.textSubtitle}>Specie: {dadosTestePeople.species[0]}</Text>
                        <Text style={styles.textSubtitle}>Gender: {dadosTestePeople.gender}</Text>
                        <Text style={styles.textSubtitle}>Height: {dadosTestePeople.height}cm</Text>
                        <Text style={styles.textSubtitle}>Mass: {dadosTestePeople.mass}Kg</Text>
                        <Text style={styles.textSubtitle}>Homeworld: {dadosTestePeople.homeworld}</Text>
                    </View>
                </View>
            </View>
            <Text>Related Films</Text>
            <View>
                <FlatList
                    data={dadosTestePeople.films}
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
                    data={dadosTestePeople.starships}
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
                    data={dadosTestePeople.vehicles}
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
        </View>
    );
}

export default PickedPeople;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center'
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