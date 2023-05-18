import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const PickedFilm = () => {
    const episode = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX' }
    const dadosTesteFilms = {
        "title": "A New Hope",
        "episode_id": 4,
        "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        "director": "George Lucas",
        "producer": "Gary Kurtz, Rick McCallum",
        "release_date": "1977-05-25",
        "characters": [
            "https://swapi.dev/api/people/1/",
            "https://swapi.dev/api/people/2/",
            "https://swapi.dev/api/people/3/",
            "https://swapi.dev/api/people/4/",
            "https://swapi.dev/api/people/5/",
            "https://swapi.dev/api/people/6/",
            "https://swapi.dev/api/people/7/",
            "https://swapi.dev/api/people/8/",
            "https://swapi.dev/api/people/9/",
            "https://swapi.dev/api/people/10/",
            "https://swapi.dev/api/people/12/",
            "https://swapi.dev/api/people/13/",
            "https://swapi.dev/api/people/14/",
            "https://swapi.dev/api/people/15/",
            "https://swapi.dev/api/people/16/",
            "https://swapi.dev/api/people/18/",
            "https://swapi.dev/api/people/19/",
            "https://swapi.dev/api/people/81/"
        ],
        "planets": [
            "https://swapi.dev/api/planets/1/",
            "https://swapi.dev/api/planets/2/",
            "https://swapi.dev/api/planets/3/"
        ],
        "starships": [
            "https://swapi.dev/api/starships/2/",
            "https://swapi.dev/api/starships/3/",
            "https://swapi.dev/api/starships/5/",
            "https://swapi.dev/api/starships/9/",
            "https://swapi.dev/api/starships/10/",
            "https://swapi.dev/api/starships/11/",
            "https://swapi.dev/api/starships/12/",
            "https://swapi.dev/api/starships/13/"
        ],
        "vehicles": [
            "https://swapi.dev/api/vehicles/4/",
            "https://swapi.dev/api/vehicles/6/",
            "https://swapi.dev/api/vehicles/7/",
            "https://swapi.dev/api/vehicles/8/"
        ],
        "species": [
            "https://swapi.dev/api/species/1/",
            "https://swapi.dev/api/species/2/",
            "https://swapi.dev/api/species/3/",
            "https://swapi.dev/api/species/4/",
            "https://swapi.dev/api/species/5/"
        ],
        "created": "2014-12-10T14:23:31.880000Z",
        "edited": "2014-12-20T19:49:45.256000Z",
        "url": "https://swapi.dev/api/films/1/"
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Image
                    source={{ uri: `https://starwars-visualguide.com/assets/img/films/${dadosTesteFilms.url.match(/\d+/)}.jpg` }}
                    style={styles.imagePoster}
                />
                <View style={styles.contentFilm}>
                    <Text style={styles.textTitle}>Info</Text>
                    <View style={styles.contentTextSubtitle}>
                        <Text style={styles.textSubtitle}>Episode {episode[dadosTesteFilms.episode_id]}: {dadosTesteFilms.title}</Text>
                        <Text style={styles.textSubtitle}>Release date: {dadosTesteFilms.release_date}</Text>
                        <Text style={styles.textSubtitle}>Director: {dadosTesteFilms.director}</Text>
                        <Text style={styles.textSubtitle}>Producer: {dadosTesteFilms.producer}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.textTitle}>Opening Crawl</Text>
            <Text style={styles.contentTextSubtitle}>{dadosTesteFilms.opening_crawl}</Text>
            <Text>Related Characters</Text>
            <View>
                <FlatList
                    data={dadosTesteFilms.characters}
                    renderItem={({ item }) => {
                        <View>
                            <Image
                                source={{ uri: `https://starwars-visualguide.com/assets/img/characters/${item.match(/\d+/)}.jpg` }}
                            />
                            <Text>{/* Colocar o nome do personagem */}</Text>
                        </View>
                    }}
                />
            </View>
            <Text>Related Planets</Text>
            <View>
                <FlatList
                    data={dadosTesteFilms.planets}
                    renderItem={({ item }) => {
                        <View>
                            <Image
                                source={{ uri: `https://starwars-visualguide.com/assets/img/planets/${item.match(/\d+/)}.jpg` }}
                            />
                            <Text>{/* Colocar o nome do planeta */}</Text>
                        </View>
                    }}
                />
            </View>
            <Text>Related Starships</Text>
            <View>
                <FlatList
                    data={dadosTesteFilms.starships}
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
            <Text>Related Species</Text>
            <View>
                <FlatList
                    data={dadosTesteFilms.species}
                    renderItem={({ item }) => {
                        <View>
                            <Image
                                source={{ uri: `https://starwars-visualguide.com/assets/img/species/${item.match(/\d+/)}.jpg` }}
                            />
                            <Text>{/* Colocar o nome do espécie */}</Text>
                        </View>
                    }}
                />
            </View>
            <Text>Related Vehicles</Text>
            <View>
                <FlatList
                    data={dadosTesteFilms.vehicles}
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

export default PickedFilm;

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