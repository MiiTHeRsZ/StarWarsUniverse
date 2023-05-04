import React, { useEffect, useState } from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Categories = () => {
    const [dropdownCategory, setDropdownCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            fetch('https://swapi.dev/api/')
                .then(response => response.json())
                .then(data => setCategories([
                    { key: 'films', name: 'Films', url: data.films },
                    { key: 'people', name: 'Characters', url: data.people },
                    { key: 'planets', name: 'Planets', url: data.planets },
                    { key: 'species', name: 'Species', url: data.species },
                    { key: 'starships', name: 'Starships', url: data.starships },
                    { key: 'vehicles', name: 'Vehicles', url: data.vehicles },
                ]));
        };

        fetchAPI();
    }, []);

    const toggleDropdown = () => {
        setDropdownCategory(!dropdownCategory);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setDropdownCategory(false);
    };

    // ! Perguntar ao professor sobre essa parte

    const renderItem = ({ item }) => {
        <TouchableOpacity
            style={styles.dropdownCategory}
            onPress={() => handleCategorySelect(item.url)}
        >
            <Text style={styles.dropdownCategoryText}>{item.name}</Text>
        </TouchableOpacity>
    }

    const renderDropdown = () => {
        if (!categories.length) {
            return null;
        }

        return (
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.dropdownCategory}
                        onPress={() => handleCategorySelect(item)}
                    >
                        <Text style={styles.dropdownCategoryText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
            />
        );
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.dropdownHeader}
                onPress={toggleDropdown}
            >
                <Text style={styles.dropdownHeaderText}>{selectedCategory ? selectedCategory.name : "Select a category"}</Text>
            </TouchableOpacity>
            {dropdownCategory && renderDropdown()}
        </View>
    );
}

export function Characters(page) {
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState('');
    const [previousPage, setPreviousPage] = useState('');

    useEffect(() => {
        fetch('https://swapi.dev/api/people/?page=' + page)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results);
                setNextPage(data.next);
                setPreviousPage(data.previous);
            });
    }, []);



    const renderCharacter = ({ item }) => (
        // Todo: Desenvolver a lógica para que o ao pressionar o campo, redirecionar para a página especifica do conteúdo
        <TouchableOpacity>
            <View style={styles.character}>
                <Image
                    source={{ uri: `https://starwars-visualguide.com/assets/img/characters/${item.url.match(/\d+/)}.jpg` }}
                    style={styles.characterImage}
                />
                <Text style={styles.characterName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={characters}
                renderItem={renderCharacter}
                keyExtractor={item => item.url}
                style={styles.charactersList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownHeader: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    dropdownHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdownCategory: {
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    dropdownCategoryText: {
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    charactersList: {
        flex: 1,
        width: '100%',
    },
    character: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    characterImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    characterName: {
        color: '#fff',
    },
});