import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const TextField = () => {
    const [content, setContent] = useState('');

    return (
        <View>
            <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="Type..."
                placeholderTextColor="#FFF"
                onChangeText={(value) => setContent(value)}
                style={styles.field}
            />
        </View>
    );
}

export default TextField;

const styles = StyleSheet.create({
    field: {
        backgroundColor: 'rgba(92, 92, 92, .6)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        width: 175,
        borderWidth: 2,
        borderColor: '#5C5C5C',
        borderRadius: 25,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',
    }
});