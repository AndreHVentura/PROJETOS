import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useCep } from "../navigation/useCep";
import { buscarCep } from "../services/viacep";

export default function Onze() {
  const { cep, setCep, resultado, setResultado } = useCep();

  const handleBuscar = async () => {
    if (cep.length === 8) {
      try {
        const dados = await buscarCep(cep);
        setResultado(dados);
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        placeholder="Digite o CEP"
      />

      <TouchableOpacity style={styles.botao} onPress={handleBuscar}>
        <Text style={styles.botaoTexto}>Obter</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultado}>
          <Text>Logradouro: {resultado.logradouro}</Text>
          <Text>Localidade: {resultado.localidade}</Text>
          <Text>UF: {resultado.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 20,
  },
  label: {
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: "#ffeb3b",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  botaoTexto: {
    fontWeight: "bold",
    color: "#000",
  },
  resultado: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
  },
});