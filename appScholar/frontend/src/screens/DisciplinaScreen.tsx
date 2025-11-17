import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import api from "../services/api";
import Header from "../components/Header";
import ThemeToggle from "../components/ThemeToggle";
import NotificationBanner from "../components/Notification";
import MenuCard from "../components/MenuCard";

export default function DisciplinaScreen({ navigation, toggleTheme }: any) {
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const carregar = async () => {
    try {
      const res = await api.get("/disciplinas");
      setDisciplinas(res.data);
    } catch (error) {
      setMessage("Erro ao carregar disciplinas");
    }
  };

  const cadastrar = async () => {
    if (!nome || !cargaHoraria) {
      setMessage("Preencha todos os campos!");
      return;
    }
    try {
      await api.post("/disciplinas", {
        nome,
        cargaHoraria: Number(cargaHoraria),
      });
      setMessage("Disciplina cadastrada com sucesso!");
      setNome("");
      setCargaHoraria("");
      carregar();
    } catch (error) {
      setMessage("Erro ao cadastrar disciplina");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Cadastro de Disciplinas"
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
        <Text style={styles.title}>Cadastrar Nova Disciplina</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome da Disciplina"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Carga Horária"
          keyboardType="numeric"
          value={cargaHoraria}
          onChangeText={setCargaHoraria}
        />

        <Button mode="contained" onPress={cadastrar} style={{ marginTop: 10 }}>
          Cadastrar
        </Button>

        <Text style={styles.subtitle}>Disciplinas Cadastradas</Text>

        {disciplinas.map((d) => (
          <MenuCard
            key={d.id}
            title={d.nome}
            subtitle={`${d.carga_horaria || d.cargaHoraria} horas`}
            icon="book-open-page-variant"
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 15,
  },
  title: { fontSize: 20, marginBottom: 15, fontWeight: "600" },
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
