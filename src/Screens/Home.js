import React, { useState } from "react";
import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";

import Header from "./components/Header";
import Search from './components/Search';
import Content from "./components/Content";

import spaceBackground from '../assets/imgs/space-background.jpg';
import babyYodaIcon from '../assets/imgs/Baby-Yoda-icon.png';

export default function Home({ navigation }) {
    const [content, setContent] = useState(null);

    const renderContent = () => {
        if (content == null) {
            return <Image source={babyYodaIcon} style={styles.babyYoda} />;
        } else {
            return <Content content={content} navigation={navigation} style={styles.content} />
        }

    }

    return (
        <View style={styles.container}>
            <ImageBackground source={spaceBackground} style={styles.spaceBackground}>
                <SafeAreaView style={styles.innerBody}>
                    <Header navigation={navigation} />
                    <Search contentAPI={(content) => setContent(content)} />
                    {renderContent()}
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#202020',
    },
    spaceBackground: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    innerBody: {
        padding: 25,
    },
    babyYoda: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - Dimensions.get('window').width,
    },
    content: {
        height: 500,
    }
});