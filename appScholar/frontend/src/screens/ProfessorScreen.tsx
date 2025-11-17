import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import api from "../services/api";
import Header from "../components/Header";
import ThemeToggle from "../components/ThemeToggle";
import MenuCard from "../components/MenuCard";
import NotificationBanner from "../components/Notification";

export default function ProfessorScreen({ navigation, toggleTheme }: any) {
  const [nome, setNome] = useState("");
  const [titulacao, setTitulacao] = useState("");
  const [tempo, setTempo] = useState("");
  const [professores, setProfessores] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const carregar = async () => {
    try {
      const res = await api.get("/professores");
      setProfessores(res.data);
    } catch (error) {
      setMessage("Erro ao carregar professores");
    }
  };

  const cadastrar = async () => {
    if (!nome || !titulacao || !tempo) {
      setMessage("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/professores", {
        nome,
        titulacao,
        tempoDocencia: Number(tempo),
      });
      setMessage("Professor cadastrado com sucesso!");
      setNome("");
      setTitulacao("");
      setTempo("");
      carregar();
    } catch (error) {
      setMessage("Erro ao cadastrar professor");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Cadastro de Professores"
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
        <Text style={styles.title}>Cadastrar Novo Professor</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Titulação"
          value={titulacao}
          onChangeText={setTitulacao}
        />
        <TextInput
          style={styles.input}
          placeholder="Tempo de Docência"
          keyboardType="numeric"
          value={tempo}
          onChangeText={setTempo}
        />
        <Button mode="contained" onPress={cadastrar} style={{ marginTop: 10 }}>
          Cadastrar
        </Button>

        <Text style={styles.subtitle}>Professores Cadastrados</Text>
        {professores.map((p) => (
          <MenuCard
            key={p.id}
            title={p.nome}
            subtitle={`${p.titulacao} • ${
              p.tempo_docencia || p.tempoDocencia
            } anos`}
            icon="school-outline"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 25,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
