import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Categories = (props) => {
    const { fieldCategory } = props;

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
                        onPress={() => {
                            handleCategorySelect(item);
                            fieldCategory(item.key);
                        }}
                    >
                        <Text style={styles.dropdownCategoryText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={<View style={styles.separatorComponent} />}
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
        backgroundColor: 'rgba(53, 53, 53, .9)',
        color: '#fff',
        width: 135,
        height: 45,
        maxWidth: 135,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderColor: 'rgba(255,255,255,.5)',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 2,
        marginRight: 5,
        justifyContent:'center',
        zIndex: 2
    },
    dropdownHeaderText: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#FFF',
        zIndex: 2
    },
    separatorComponent: {
        backgroundColor: 'rgba(221,185,0,.9)',
        width: '80%',
        height: 2,
        alignSelf: 'center',
        borderRadius: 5,
        zIndex: 2
    },
    dropdownCategoryItems: {
        width: 135,
        backgroundColor: 'rgba(53, 53, 53, .9)',
        borderRadius: 15,
        borderColor: 'rgba(255,255,255,.5)',
        borderWidth: 1,
        zIndex: 2
    },
    dropdownCategory: {
        paddingVertical: 5,
        paddingHorizontal: 2,
        zIndex: 1
    },
    dropdownCategoryText: {
        textAlign: 'center',
        fontSize: 19,
        color: '#fff',
        borderRadius: 25,
        padding: 5,
        fontWeight: 'bold',
        zIndex: 2
    }
});