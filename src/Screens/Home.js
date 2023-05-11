import React, { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";

import spaceBackground from '../assets/imgs/space-background.jpg';

import Header from "./components/Header";
import Search from './components/Search';
import Content from "./components/Content";

export default function Home({ navigation }) {
    const [content, setContent] = useState([]);
    
    return (
        <View style={styles.container}>
            <ImageBackground source={spaceBackground} style={styles.spaceBackground}>
                <SafeAreaView style={styles.innerBody}>
                    <Header navigation={navigation} />
                    <Search />
                    <Content />
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
        padding: 25,
    },
});