import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Content(props) {
    const { content, navigation } = props;
    const [category, setCategory] = useState('');

    function goPickedFilm(pickedFilm) {
        navigation.navigate('PickedFilm', pickedFilm);
    }
    function goPickedPeople(pickedPeople) {
        navigation.navigate('PickedPeople', pickedPeople);
    }
    function goPickedPlanet(pickedPlanet) {
        navigation.navigate('PickedPlanet', pickedPlanet);
    }
    function goPickedSpecie(pickedSpecie) {
        navigation.navigate('PickedSpecie', pickedSpecie);
    }
    function goPickedStarship(pickedStarship) {
        navigation.navigate('PickedStarship', pickedStarship);
    }
    function goPickedVehicle(pickedVehicle) {
        navigation.navigate('PickedVehicle', pickedVehicle);
    }

    useEffect(() => {
        if (content != null) {
            setCategory(content.results[0].url.split("/")[4]);
        }
    }, [content]);

    if (category == 'people') {
        setCategory('characters');
    }

    const goInfo = (item) => {
        switch (category) {
            case "films":
                goPickedFilm(item)
                break;
            case "characters":
                goPickedPeople(item)
                break;
            case "planets":
                goPickedPlanet(item)
                break;
            case "species":
                goPickedSpecie(item)
                break;
            case "starships":
                goPickedStarship(item)
                break;
            case "vehicles":
                goPickedVehicle(item)
                break;

            default:
                break;
        }
    }

    const renderItem = ({ item }) => {
        let text = category == 'films' ? item.title : item.name;

        return (
            <TouchableOpacity onPress={() => { goInfo(item) }}>
                <View style={styles.item}>
                    <Image
                        source={{ uri: `https://starwars-visualguide.com/assets/img/${category}/${item.url.match(/\d+/)}.jpg` }}
                        style={styles.itemImage}
                    />
                    <Text style={styles.itemName}>{text}</Text>
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
                showsVerticalScrollIndicator={false}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#4C4C4C',
    },
    list: {
        backgroundColor: 'rgba(85, 85, 85, .6)',
        height: Dimensions.get('window').height - 180,
        borderRadius: 25,

    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    itemImage: {
        borderRadius: 50,
        width: 75,
        height: 75,
        marginRight: 10,
    },
    itemName: {
        color: '#FFF',
        fontWeight: 'bold'
    },
});