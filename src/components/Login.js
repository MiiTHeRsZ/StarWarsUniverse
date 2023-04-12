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

import ValidateLogin from '../../validateLogin';

const MENSAGEM_EMAIL = 'Digite o seu e-mail.';
const MENSAGEM_SENHA = 'Digite a sua senha.';
const EMAIL = 'eve.holt@reqres.in';
const SENHA = 'cityslicka';

const image = {
    uri: 'https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701215536.jpg',
};
const logo = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png',
};

const buto = { uri: 'https://cdn3.emoji.gg/emojis/7182_yoda.png' };

/* const ValidateLogin = async (email, senha, status, activity) => {
    if (email.trim().length === 0) {
        alert(MENSAGEM_EMAIL);
        return;
    }

    if (senha.trim().length === 0) {
        alert(MENSAGEM_SENHA);
        return;
    }

    activity(true);

    let usuario = {
        email: email,
        password: senha,
    };

    await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
        .then((response) => {
            if (response.status === 200) {
                response.text().then(function (result) {
                    status('Com sucesso autenticado o você foi');
                    console.log(result);
                });
            } else {
                status(`Inválido o usuário ou a senha está`);
            }
            activity(false);
        })
        .catch(() => status('Executar login não foi possível'));
}; */

export default function Login() {
    const [user, setUser] = useState(EMAIL);
    const [password, setPassword] = useState(SENHA);
    const [status, setStatus] = useState('');
    const [activity, setActivity] = useState(false);

    return (
        <View style={Estilos.container}>
            <ImageBackground source={image} resizeMode="cover" style={Estilos.image}>
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
                        onPress={() => ValidateLogin(user, password, setStatus, setActivity)} style={Estilos.buto}>
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
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#202020',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        height: '25%',
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