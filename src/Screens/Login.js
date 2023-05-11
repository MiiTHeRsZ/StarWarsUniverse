import React, { useState } from "react";
import {
    ImageBackground,
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';

import spaceBackground from '../assets/imgs/space-background.jpg';
import logo from '../assets/imgs/Star_Wars_Logo.png';

const MENSAGEM_EMAIL = 'Digite o seu e-mail.';
const MENSAGEM_SENHA = 'Digite a sua senha.';
const EMAIL = 'eve.holt@reqres.in';
const SENHA = 'cityslicka';

const buto = { uri: 'https://cdn3.emoji.gg/emojis/7182_yoda.png' };

export default function Login({ navigation }) {
    const [user, setUser] = useState(EMAIL);
    const [password, setPassword] = useState(SENHA);
    const [status, setStatus] = useState('');
    const [activity, setActivity] = useState(false);

    function openHome() {
        navigation.navigate('Home');
    }

    return (
        <View style={Estilos.container}>
            <ImageBackground source={spaceBackground} style={Estilos.spaceBackground}>
                <SafeAreaView style={Estilos.innerBody}>
                    <Image source={logo} style={Estilos.logo} />
                    <Text style={Estilos.paragraph}>Fazer Login você deve</Text>

                    <Text style={Estilos.label}>Senha:</Text>
                    <TextInput
                        autoCorrect={false}
                        placeholder={MENSAGEM_SENHA}
                        placeholderTextColor="grey"
                        style={Estilos.textInput}
                        secureTextEntry={true}
                        clearButtonMode="always"
                        defaultValue={SENHA}
                        onChangeText={(value) => setPassword(value)}
                    />

                    <Text style={Estilos.label}>E-mail:</Text>
                    <TextInput
                        autoCorrect={false}
                        placeholder={MENSAGEM_EMAIL}
                        placeholderTextColor="grey"
                        style={Estilos.textInput}
                        clearButtonMode="always"
                        defaultValue={EMAIL}
                        onChangeText={(value) => setUser(value)}
                    />
                    <TouchableOpacity
                        onPress={openHome}
                        style={Estilos.buto}>
                        <Image source={buto} style={Estilos.yoda} />

                    </TouchableOpacity>
                    <View style={{ marginTop: 10 }}>
                        <ActivityIndicator size="large" animating={activity} />
                    </View>
                    <Text style={Estilos.label}>{status}</Text>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const Estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#202020',
    },
    spaceBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        height: '35%',
        width: '100%',
        resizeMode: 'contain',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
    textInput: {
        backgroundColor: '#666',
        color: 'white',
        fontSize: 15,
        height: 40,
        width: 250,
        marginBottom: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 10,
        padding: 8
    },
    buto: {
        height: 65,
        width: 65,
        alignSelf: 'center',
        borderRadius: 50
    },
    innerBody: {
        padding: 25,
    },
    yoda: {
        height: '100%'
    }
});