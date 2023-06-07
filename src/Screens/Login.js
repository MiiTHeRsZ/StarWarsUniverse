import React, { useState } from 'react';
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
import yodaIcon from '../assets/imgs/Yoda-icon.png';
import imgOlhoAberto from '../assets/imgs/olhoAbert.png';
import imgOlhoFechado from '../assets/imgs/olhoFechado.png';

const MENSAGEM_EMAIL = 'Digite o seu e-mail.';
const MENSAGEM_SENHA = 'Digite a sua senha.';
const EMAIL = 'starwarsuniverse@email.com';
const SENHA = 'starWarsIsCool';

export default function Login({ navigation }) {
  const [user, setUser] = useState(EMAIL);
  const [password, setPassword] = useState(SENHA);
  const [status, setStatus] = useState('');
  const [activity, setActivity] = useState(false);
  const [pass, setPass] = useState(true);
  const [img, setImg] = useState(imgOlhoAberto);

  function changeEye() {
    setPass(!pass)
    if (pass == false) {
      setImg(imgOlhoAberto)
    } else {
      setImg(imgOlhoFechado)
    }
  };

  function openHome() {
    navigation.navigate('Home');
  }

  return (
    <View style={Estilos.container}>
      <ImageBackground source={spaceBackground} style={Estilos.spaceBackground}>
        <SafeAreaView style={Estilos.innerBody}>
          <Image source={logo} style={Estilos.logo} />
          <Text style={Estilos.paragraph}>Fazer Login você deve</Text>

          <View style={Estilos.boxPassword}>
            <Text style={Estilos.label}>Senha:</Text>
            <TextInput
              autoCorrect={false}
              placeholder={MENSAGEM_SENHA}
              placeholderTextColor="grey"
              style={Estilos.textInputSenha}
              secureTextEntry={pass}
              clearButtonMode="never"
              defaultValue={SENHA}
              onChangeText={(value) => setPassword(value)}
            />

            <TouchableOpacity onPress={() => changeEye()} style={Estilos.showPass}>
              <Image source={img} style={Estilos.imgOlho} />
            </TouchableOpacity>

          </View>

          <Text style={Estilos.label}>E-mail:</Text>
          <TextInput
            autoCorrect={false}
            placeholder={MENSAGEM_EMAIL}
            placeholderTextColor="grey"
            style={Estilos.textInput}
            clearButtonMode="never"
            defaultValue={EMAIL}
            onChangeText={(value) => setUser(value)}
          />
          <TouchableOpacity onPress={openHome} style={Estilos.buto}>
            <Image source={yodaIcon} style={Estilos.yoda} />
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
    margin: 10,
  },
  boxPassword: {
    width: 250,
    alignSelf: 'center'
  },
  textInputSenha: {
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
    padding: 8,
    paddingRight: "20%"
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
    padding: 8,
  },
  showPass: {
    position: 'absolute',
    top: '40%',
    right: 5,
    width: 40,
    height: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgOlho: {
    width: 25,
    height: 25,
  },
  buto: {
    height: 65,
    width: 65,
    alignSelf: 'center',
    borderRadius: 50,

  },
  innerBody: {
    padding: 25,
  },
  yoda: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
});
