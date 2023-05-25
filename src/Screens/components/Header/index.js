import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import logo from '../../../assets/imgs/Star_Wars_Logo.png';
import returnIcon from '../../../assets/imgs/Return-icon.png';
import homeIcon from '../../../assets/imgs/Home-icon.png';

export default function Header(props) {
    const { navigation } = props;
    
    function goHome() {
        navigation.navigate('Home');
    }

    return (
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
    );
}

const styles = StyleSheet.create({
    touchable: {
        width: '14%',
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
        width: '65%',
        marginHorizontal: 20,
        flexGrow: 1,
    }
});