import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import api from "../services/api";
import Header from "../components/Header";
import MenuCard from "../components/MenuCard";
import NotificationBanner from "../components/Notification";
import ThemeToggle from "../components/ThemeToggle";
import { Button } from "react-native-paper";

export default function AlunoScreen({ navigation, toggleTheme }: any) {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [alunos, setAlunos] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const carregarAlunos = async () => {
    const res = await api.get("/alunos");
    setAlunos(res.data);
  };

  const cadastrarAluno = async () => {
    if (!nome || !matricula || !curso) {
      setMessage("Preencha todos os campos!");
      return;
    }
    await api.post("/alunos", { nome, matricula, curso });
    setMessage("Aluno cadastrado com sucesso!");
    setNome("");
    setMatricula("");
    setCurso("");
    carregarAlunos();
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Cadastro de Alunos"
        onLogout={() => navigation.replace("Login")}
      />
      <View style={styles.topBar}>
        <ThemeToggle toggleTheme={toggleTheme} />
      </View>
      <NotificationBanner
        visible={!!message}
        message={message}
        onDismiss={() => setMessage("")}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
        />
        <TextInput
          style={styles.input}
          placeholder="Curso"
          value={curso}
          onChangeText={setCurso}
        />

        <Button mode="contained" onPress={cadastrarAluno}>
          Cadastrar Aluno
        </Button>
        <Text style={styles.listTitle}>Alunos Cadastrados</Text>
        {alunos.map((aluno) => (
          <MenuCard
            key={aluno.id}
            title={aluno.nome}
            subtitle={aluno.curso}
            icon="account"
            onPress={() => {}}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  listTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
  },
});
