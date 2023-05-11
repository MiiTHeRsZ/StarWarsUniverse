import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Categories = () => {
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

    // TODO Perguntar ao professor sobre essa parte
    // ! Atualmente em desuso

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
                style={styles.dropdownCategoryItems}
            />
        );
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.dropdownHeader}
                onPress={toggleDropdown}
            >
                <Text style={styles.dropdownHeaderText}>{selectedCategory ? selectedCategory.name : "Category"}</Text>
            </TouchableOpacity>
            {dropdownCategory && renderDropdown()}
        </View>
    );
}

export default Categories;

const styles = StyleSheet.create({
    dropdownHeader: {
        backgroundColor: 'rgba(92, 92, 92, .6)',
        width: 115.2,
        padding: 10,
        borderWidth: 2,
        borderColor: '#5C5C5C',
        borderRadius: 25,
    },
    dropdownHeaderText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',
    },
    dropdownCategoryItems: {
        backgroundColor: 'rgba(92, 92, 92, .6)',
        borderWidth: 2,
        borderRadius: 25,
        borderColor: '#5C5C5C',
    },
    dropdownCategory: {
        padding: 10,
    },
    dropdownCategoryText: {
        fontSize: 19,
        color: '#EFEFEF',
    }
});