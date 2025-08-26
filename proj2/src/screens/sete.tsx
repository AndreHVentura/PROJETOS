import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Sete() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [resultado, setResultado] = useState("");

  const handleLogin = () => {
    if (email && senha) {
      setResultado(`Email: ${email}\nSenha: ${senha}`);
    } else {
      setResultado("Preencha os dois campos!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        maxLength={8}
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cadastroButton]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      {resultado ? (
        <View style={styles.resultadoBox}>
          <Text style={styles.resultado}>{resultado}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  row: {
    flexDirection: "row", // coloca lado a lado
    justifyContent: "space-between", // espaçamento entre eles
    marginTop: 10,
  },
  button: {
    flex: 1, // ocupa espaço proporcional
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5, // espaço entre botões
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cadastroButton: {
    backgroundColor: "red", // exemplo: botão de cancelar em vermelho
  },
  resultadoBox: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  resultado: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
