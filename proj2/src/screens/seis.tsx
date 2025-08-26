import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Constants from "expo-constants";

export default function Seis() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [resultado, setResultado] = useState("");

  const handleSalvar = () => {
    if (nome && idade) {
      setResultado(`Nome: ${nome}, Idade: ${idade}`);
    } else {
      setResultado("Preencha os dois campos!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={handleSalvar} />
      {resultado ? <Text style={styles.resultado}>{resultado}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  resultado: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});