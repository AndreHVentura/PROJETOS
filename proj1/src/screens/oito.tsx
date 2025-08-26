import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Constants from "expo-constants";

export default function Oito() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const handleCadastrar = () => {
    if (senha !== confirmaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    Alert.alert('Sucesso', `Cadastro realizado com o e-mail: ${email}`);
  };

  const handleLogar = () => {
    Alert.alert('Login', `Tentativa de login com: ${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.moldura}>
        <Text style={styles.titulo}>CADASTRO</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={styles.label}>Confirmação da senha</Text>
        <TextInput
          style={styles.input}
          value={confirmaSenha}
          onChangeText={setConfirmaSenha}
          secureTextEntry
        />

        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botao} onPress={handleCadastrar}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={handleLogar}>
            <Text style={styles.botaoTexto}>Logar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // fundo escuro como na imagem
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  moldura: {
    width: 270,
    padding: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    backgroundColor: '#444', // leve contraste com o fundo
  },
  titulo: {
    color: '#d6ff00',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botao: {
    backgroundColor: '#ffb300',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  botaoTexto: {
    color: '#000',
    fontWeight: 'bold',
  },
});