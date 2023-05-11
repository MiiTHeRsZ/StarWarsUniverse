import React from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";

import spaceBackground from '../assets/space-background.jpg';
import logo from '../assets/Star_Wars_Logo.png';
import returnIcon from '../assets/imgs/Return-icon.png';
import homeIcon from '../assets/Home-icon.png';

import Search from './components/Search';

export default function Home({ navigation }) {
    function goHome() {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={spaceBackground} style={styles.spaceBackground}>
                <SafeAreaView style={styles.innerBody}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.touchable}
                        >
                            <Image source={returnIcon} style={styles.icon} />
                        </TouchableOpacity>
                        <Image source={logo} style={styles.logo} />
                        <TouchableOpacity
                            onPress={goHome}
                            style={styles.touchable}
                        >
                            <Image source={homeIcon} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <Search />
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
    touchable: {
        width: '14%',
    },
    spaceBackground: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    innerBody: {
        padding: 25,
    },
    header: {
        flexDirection: 'row',
        height: 85,
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
    },
    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        marginLeft: '0%',
        marginRight: '0%',
    },
    logo: {
        height: '100%',
        width: '60%',
        marginHorizontal: 20,
        flexGrow: 1
    }
});