import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ContentFilms from "./ContentFilms";

export default function Content(props) {
    const { content } = props;
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (content != null) {
            setCategory(content.results[0].url.split("/")[4]);
        }
    }, [content]);

    if (category == 'people') {
        setCategory('characters');
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { }}>
                <View style={styles.item}>
                    <Image
                        source={{ uri: `https://starwars-visualguide.com/assets/img/${category}/${item.url.match(/\d+/)}.jpg` }}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemName}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={content.results}
                renderItem={renderItem}
                keyExtractor={item => item.url}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    itemName: {
        color: '#fff',
    }
});