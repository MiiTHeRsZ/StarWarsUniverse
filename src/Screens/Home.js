import React, { useState } from "react";
import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";

import Header from "./components/Header";
import Search from './components/Search';
import Content from "./components/Content";

import spaceBackground from '../assets/imgs/space-background.jpg';
import babyYodaIcon from '../assets/imgs/Baby-Yoda-icon.png';

export default function Home({ navigation }) {
    const [content, setContent] = useState(null);

    const renderContent = () => {
        if (content == null || content.people == "https://swapi.dev/api/people/") {
            return <Image source={babyYodaIcon} style={styles.babyYoda} />;
        } else {
            console.log(content == [{"films": "https://swapi.dev/api/films/", "people": "https://swapi.dev/api/people/", "planets": "https://swapi.dev/api/planets/", "species": "https://swapi.dev/api/species/", "starships": "https://swapi.dev/api/starships/", "vehicles": "https://swapi.dev/api/vehicles/"}]);
            return <Content content={content} navigation={navigation} style={styles.content} />
        }

    }

    return (
        <View style={styles.container}>
            <ImageBackground source={spaceBackground} style={styles.spaceBackground}>
                <SafeAreaView style={styles.innerBody}>
                    <Header navigation={navigation} />
                    <Search contentAPI={(content) => setContent(content)} />
                    {renderContent()}
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
        width: '100%'
    },
    innerBody: {
        padding:25,
    },
    babyYoda: {
        alignSelf: 'center',
        width: ((Dimensions.get('window').width) -10),
        height: ((Dimensions.get('window').height) - (Dimensions.get('window').width) -80),
        position: 'absolute',
        top:250,
        zIndex:-1,
    },
    content: {
        height: 500,
    }
});