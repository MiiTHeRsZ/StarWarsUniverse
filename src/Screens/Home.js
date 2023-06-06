import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
} from 'react-native';

import Header from './components/Header';
import Search from './components/Search';
import Content from './components/Content';

import spaceBackground from '../assets/imgs/space-background.jpg';
import babyYodaIcon from '../assets/imgs/Baby-Yoda-icon.png';

export default function Home({ navigation }) {
  const [content, setContent] = useState(null);

  const renderContent = () => {
    if (content == null || content.people == 'https://swapi.dev/api/people/') {
      return <Image source={babyYodaIcon} style={styles.babyYoda} />;
    } else {
      return (
        <Content
          content={content}
          navigation={navigation}
          style={styles.content}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={spaceBackground} style={styles.spaceBackground}>
        <SafeAreaView style={styles.innerBody}>
          <Header navigation={navigation} />
          <View style={styles.resultBox}>
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
    width: '100%',
    zIndex: -2,
  },
  innerBody: {
    padding: 15,
  },
  babyYoda: {
    zIndex: Platform.OS === 'ios' ? -2 : 0,
    alignSelf: 'center',
    width: Dimensions.get('window').width + 5,
    height: Dimensions.get('window').height / 2,
    position: 'static',
    top: Dimensions.get('window').height / 5 - 10,
  },
  content: {
    
    height: 500,
  },
  resultBox: {
    marginTop: 25,
  },
});
