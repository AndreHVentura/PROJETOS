import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import api from "../services/api";
import Header from "../components/Header";
import ThemeToggle from "../components/ThemeToggle";
import NotificationBanner from "../components/Notification";
import MenuCard from "../components/MenuCard";

export default function BoletimScreen({ navigation, toggleTheme }: any) {
  const [idAluno, setIdAluno] = useState("");
  const [boletim, setBoletim] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const buscarBoletim = async () => {
    if (!idAluno) {
      setMessage("Informe o ID do aluno!");
      return;
    }

    try {
      const res = await api.get(`/boletim/${idAluno}`);
      setBoletim(res.data);
      if (res.data.length === 0) {
        setMessage("Nenhum boletim encontrado para esse aluno.");
      } else {
        setMessage("");
      }
    } catch (error) {
      setMessage("Erro ao buscar boletim do aluno.");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Boletim Acadêmico"
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
        <Text style={styles.title}>Consultar Boletim</Text>

        <TextInput
          style={styles.input}
          placeholder="ID do Aluno"
          keyboardType="numeric"
          value={idAluno}
          onChangeText={setIdAluno}
        />

        <Button
          mode="contained"
          onPress={buscarBoletim}
          style={{ marginTop: 10 }}
        >
          Buscar
        </Button>

        <Text style={styles.subtitle}>Disciplinas e Notas</Text>

        {boletim.map((item) => (
          <MenuCard
            key={item.id}
            title={item.Disciplina?.nome || "Disciplina"}
            subtitle={`Média: ${item.media} • Situação: ${item.situacao}`}
            icon="clipboard-text-outline"
            onPress={() => {}}
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
