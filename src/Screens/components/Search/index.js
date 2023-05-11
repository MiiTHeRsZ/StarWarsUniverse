import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import Categories from "./Categories";
import TextField from "./TextField";

import searchIcon from '../../../assets/imgs/Search-Button-icon.png'

export default function Search() {
    return (
        <View style={styles.container}>
            <Categories />
            <TextField style={{ flexGrow: 1 }} />
            <TouchableOpacity
                onPress={() => { }}
                style={styles.touchable}
            >
                <Image source={searchIcon} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    icon: {
        height: 44,
        width: 30,
        resizeMode: 'contain',
        marginLeft: '0%',
        marginRight: '0%',
    },
});