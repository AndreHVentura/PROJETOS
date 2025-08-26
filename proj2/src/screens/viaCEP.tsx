import React, { useContext, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { CepContext } from "../context/CepContext";

export default function ViaCep() {
  const { cep, setCep, setCepInfo, adicionarConsulta } = useContext(CepContext);
  const [erro, setErro] = useState(false);

  const buscarCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro(true);
        setCepInfo(null);
      } else {
        setErro(false);
        setCepInfo(data);
        adicionarConsulta(data); // adiciona só se for válido
      }
    } catch (error) {
      setErro(true);
      setCepInfo(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        style={styles.input}
      />
      <Button title="Obter" onPress={buscarCep} />

      {erro && <Text style={{ color: "red" }}>CEP inválido</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: {
    borderWidth: 1,
    width: "80%",
    marginBottom: 10,
    padding: 8,
    backgroundColor: "#fff",
  },
});