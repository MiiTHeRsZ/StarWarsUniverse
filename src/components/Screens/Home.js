import React from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";

import returnIcon from '../../assets/Millennium-Falcon-icon.png';
import spaceBackground from '../../assets/space-background.jpg';
import logo from '../../assets/Star_Wars_Logo.png';

export default function Home() {
    return (
        <View style={Estilos.container}>
            <ImageBackground source={spaceBackground} style={Estilos.spaceBackground}>
                <SafeAreaView style={Estilos.innerBody}>
                    <View style={Estilos.header}>
                        <Image source={returnIcon} style={Estilos.returnIcon} />
                        <Image source={logo} style={Estilos.logo} />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const Estilos = StyleSheet.create({
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
    header: {
        flexDirection: 'row',
        height: 75,
        backgroundColor: 'blue',
        marginTop: 20,
        alignItems: 'center'
    },
    returnIcon: {
        height: 50,
        width: '13%',
        resizeMode: 'contain',
        backgroundColor: 'green',
        //left: -70
    },
    logo: {
        height: '100%',
        width: '60%',
        resizeMode: 'contain',
        backgroundColor: 'red'
    }
});