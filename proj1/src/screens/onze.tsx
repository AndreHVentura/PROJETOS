import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Constants from "expo-constants";

type RootStackParamList = {
  Um: undefined;
  Dois: undefined;
  Tres: undefined;
  Quatro: undefined;
  Cinco: undefined;
  Seis: undefined;
  Sete: undefined;
  Oito: undefined;
  Nove: undefined;
  Dez: undefined;
};

type OnzeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Onze() {
  const navigation = useNavigation<OnzeScreenNavigationProp>();

  const telas = [
    { nome: 'Um', rota: 'Um' },
    { nome: 'Dois', rota: 'Dois' },
    { nome: 'Três', rota: 'Tres' },
    { nome: 'Quatro', rota: 'Quatro' },
    { nome: 'Cinco', rota: 'Cinco' },
    { nome: 'Seis', rota: 'Seis' },
    { nome: 'Sete', rota: 'Sete' },
    { nome: 'Oito', rota: 'Oito' },
    { nome: 'Nove', rota: 'Nove' },
    { nome: 'Dez', rota: 'Dez' },
  ] as const;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../assets/images.png')}
          style={styles.logo}
        />
        <Text style={styles.titulo}>HOME</Text>

        <View style={styles.botoesContainer}>
          {telas.map((tela, index) => (
            <TouchableOpacity
              key={index}
              style={styles.botao}
              onPress={() => navigation.navigate(tela.rota)}
            >
              <Text style={styles.botaoTexto}>{tela.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    width: 250,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  botoesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  botao: {
    backgroundColor: '#ffb300',
    width: '48%',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 4,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#000',
    fontWeight: 'bold',
  },
});