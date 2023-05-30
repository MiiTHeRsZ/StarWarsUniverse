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
        if (content == null || content.people == "https://swapi.dev/api/people/") {
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
<View style={styles.test}>

                    <Search contentAPI={(content) => setContent(content)} />
                    {renderContent()}
</View>

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
        width: ((Dimensions.get('window').width) - 10),
        height: ((Dimensions.get('window').height) / 2),
        position: 'absolute',
        top: ((Dimensions.get('window').height)/5-10),
        zIndex: -1,
    },
    content: {
        height: 500,

    },
    test:{
        marginTop:25,
    }
});