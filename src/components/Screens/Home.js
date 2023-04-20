import React from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, View, TouchableOpacity } from "react-native";

import returnIcon from '../../assets/Millennium-Falcon-icon.png';
import spaceBackground from '../../assets/space-background.jpg';
import logo from '../../assets/Star_Wars_Logo.png';

export default function Home() {
    return (
        <View style={Estilos.container}>
            <ImageBackground source={spaceBackground} style={Estilos.spaceBackground}>
                <SafeAreaView style={Estilos.innerBody}>
                    <View style={Estilos.header}>
                        <TouchableOpacity style={Estilos.touchable}>
                        <Image source={returnIcon} style={Estilos.returnIcon} />
                        </TouchableOpacity>
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
    touchable:{
        width:'14%',
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
        height: 83,
        width:'100%',
        marginTop: 20,
        alignItems: 'center',
    },
    returnIcon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
        marginLeft:'0%',
        marginRight:'0%',
    },
    logo: {
        height: '100%',
        width: '60%',
        marginLeft:'7%',
    }
});