import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const TextField = (props) => {
    const { fieldContent } = props;
    
    return (
        <View>
            <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="Type..."
                placeholderTextColor="#FFF"
                onChangeText={(value) => fieldContent(value)}
                style={styles.field}
            />
        </View>
    );
}

export default TextField;

const styles = StyleSheet.create({
    field: {
        backgroundColor: 'rgba(53, 53, 53, .9)',
        paddingVertical: 7,
        paddingHorizontal: 12,
        width: 155,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,.5)',
        borderRadius: 25,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight:5,
    }
});