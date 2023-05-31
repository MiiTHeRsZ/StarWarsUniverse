import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView } from "react-native";
import spaceBackground from '../../../../assets/imgs/space-background.jpg';
import Header from '../../Header'

export default function PickedFilm({ route, navigation }) {

    const [contentFilm, setContentFilm] = useState(route.params);
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
            <ImageBackground source={spaceBackground} style={styles.spaceBackground}>
                <View style={styles.body}>
                    <SafeAreaView style={styles.innerBody}>
                        <ScrollView style={{marginTop:20}}>

                            <Header navigation={navigation} />


                            <View style={styles.main}>
                                <Image
                                    source={{ uri: `https://starwars-visualguide.com/assets/img/films/${dadosTesteFilms.url.match(/\d+/)}.jpg` }}
                                    style={styles.imagePoster}
                                />
                                <View style={styles.contentFilm}>
                                    <Text style={styles.filmName}>Episode {episode[dadosTesteFilms.episode_id]}: {dadosTesteFilms.title}</Text>
                                    <View style={styles.contentTextSubtitle}>
                                        <Text style={styles.textSubtitle}>Release date: {dadosTesteFilms.release_date}</Text>
                                        <Text style={styles.textSubtitle}>Director: {dadosTesteFilms.director}</Text>
                                        <Text style={styles.textSubtitle}>Producer: {dadosTesteFilms.producer}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.textTitle}>Opening Crawl</Text>
                            <Text style={styles.openingCrawl}>{dadosTesteFilms.opening_crawl}</Text>
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
                                    horizontal
                                    
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
                                    horizontal
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
                                    horizontal
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
                                    horizontal
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
                                    horizontal
                                />
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        </View>

    );
}

//export default PickedFilm;

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