import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from "expo-constants";

export default function Dez() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [role, setRole] = useState('manager');
  const [logado, setLogado] = useState(false); // novo estado para o switch

  const handleCadastrar = () => {
    if (senha !== confirmaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    Alert.alert('Sucesso', `Cadastro realizado com o e-mail: ${email} e perfil: ${role}`);
  };

  const handleLogar = () => {
    Alert.alert('Login', `Tentativa de login com: ${email}, perfil: ${role}, logado: ${logado}`);
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

        <Text style={styles.label}>Tipo de usuário</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="Administrador" value="admin" />
            <Picker.Item label="Gestor" value="manager" />
            <Picker.Item label="Usuário" value="user" />
          </Picker>
        </View>

        {/* Novo Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Logado</Text>
          <Switch
            value={logado}
            onValueChange={setLogado}
            trackColor={{ false: "#e77878", true: "#94df83" }}
            thumbColor={logado ? "#47eb22" : "#ed1111"}
          />
        </View>

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
    backgroundColor: '#333',
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
    backgroundColor: '#444',
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
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 15,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
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