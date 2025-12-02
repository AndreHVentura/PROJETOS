import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Card,
  Text,
  Button,
  DataTable,
  ActivityIndicator,
} from "react-native-paper";
import api from "../services/api";
import CustomHeader from "../components/Header";
import NotificationBanner from "../components/Notification";
import { useAuth } from "../hooks/useAuth";

export default function ProfessorDisciplinasScreen({ navigation }: any) {
  const { user } = useAuth();
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const carregarDisciplinas = async () => {
    try {
      setLoading(true);
      const res = await api.get("/nota/professor/disciplinas");
      setDisciplinas(res.data);
      setMessage("");
    } catch (error) {
      console.error("Erro ao carregar disciplinas:", error);
      setMessage("Erro ao carregar suas disciplinas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDisciplinas();
  }, []);

  const selecionarDisciplina = (disciplina: any) => {
    navigation.navigate("AlunosDisciplina", {
      disciplinaId: disciplina.id,
      disciplinaNome: disciplina.nome,
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Minhas Disciplinas"
        showLogout={false}
        showBackButton={true}
        onBack={() => navigation.goBack()}
      />

      <NotificationBanner
        visible={!!message}
        message={message}
        onDismiss={() => setMessage("")}
      />

      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>Disciplinas Ministradas</Text>
            <Text style={styles.subtitle}>
              Selecione uma disciplina para lançar notas
            </Text>

            {loading ? (
              <ActivityIndicator size="large" style={styles.loading} />
            ) : (
              <DataTable style={styles.table}>
                <DataTable.Header>
                  <DataTable.Title style={styles.columnNome}>
                    Disciplina
                  </DataTable.Title>
                  <DataTable.Title style={styles.columnCarga}>
                    Carga Horária
                  </DataTable.Title>
                  <DataTable.Title style={styles.columnAcoes}>
                    Ações
                  </DataTable.Title>
                </DataTable.Header>

                {disciplinas.map((disciplina) => (
                  <DataTable.Row key={disciplina.id}>
                    <DataTable.Cell style={styles.columnNome}>
                      <Text style={styles.disciplinaNome}>
                        {disciplina.nome}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.columnCarga}>
                      {disciplina.cargaHoraria} h
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.columnAcoes}>
                      <Button
                        mode="contained"
                        compact
                        onPress={() => selecionarDisciplina(disciplina)}
                        style={styles.button}
                        icon="account-group"
                      >
                        Alunos
                      </Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}

                {disciplinas.length === 0 && !loading && (
                  <DataTable.Row>
                    <DataTable.Cell>
                      <Text style={styles.emptyText}>
                        Nenhuma disciplina atribuída a você
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              </DataTable>
            )}

            <Button
              mode="outlined"
              onPress={carregarDisciplinas}
              style={styles.refreshButton}
              icon="refresh"
            >
              Atualizar
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollView: { flex: 1 },
  card: { margin: 16, elevation: 4 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8, color: "#333" },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 16 },
  table: { marginHorizontal: -8 },
  columnNome: { flex: 2 },
  columnCarga: { flex: 1 },
  columnAcoes: { flex: 1 },
  disciplinaNome: { fontWeight: "500" },
  button: { marginVertical: 2 },
  loading: { marginVertical: 20 },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    padding: 20,
  },
  refreshButton: { marginTop: 16 },
});
