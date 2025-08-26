import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { CepContext } from "../context/CepContext";

export default function ConsultasCEP() {
  const { consultas } = useContext(CepContext);

  return (
    <ScrollView style={styles.container}>
      {consultas.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Logradouro: {item.logradouro}</Text>
          <Text>Bairro: {item.bairro}</Text>
          <Text>Localidade: {item.localidade}</Text>
          <Text>UF: {item.uf}</Text>
          <Text>CEP: {item.cep}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});