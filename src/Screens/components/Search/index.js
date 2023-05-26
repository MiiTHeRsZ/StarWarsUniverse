import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, } from "react-native";

import Categories from "./Categories";
import TextField from "./TextField";

import searchIcon from '../../../assets/imgs/Search-Button-icon.png';

export default function Search(props) {
    const { contentAPI } = props;

    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');

    const urlAPI = `https://swapi.dev/api/${category}/?search=${search}`;

    const fetchAPI = async () => {
        fetch(urlAPI)
            .then(response => response.json())
            .then(data => {
                contentAPI(data);
            });
    };

    return (
        <View style={styles.container}>
            <Categories fieldCategory={(category) => setCategory(category)} />
            <TextField fieldContent={(search) => setSearch(search)} />
            <TouchableOpacity
                onPress={fetchAPI}
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
        alignItems:'flex-start'
    },
    icon: {
        height: 44,
        width: 30,
        resizeMode: 'contain',
    },
});