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

export default function AlunosDisciplinaScreen({ route, navigation }: any) {
  const { disciplinaId, disciplinaNome } = route.params;
  const [alunos, setAlunos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const carregarAlunos = async () => {
    try {
      setLoading(true);
      // Usar o endpoint que você criou no back-end
      const res = await api.get(`/nota/disciplina/${disciplinaId}/alunos`);
      setAlunos(res.data);
      setMessage("");
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
      setMessage("Erro ao carregar alunos da disciplina");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, [disciplinaId]);

  const lancarNotasAluno = (aluno: any) => {
    navigation.navigate("LancarNotasAluno", {
      aluno,
      disciplinaId,
      disciplinaNome,
    });
  };

  const lancarNotasEmLote = () => {
    navigation.navigate("LancarNotasLote", {
      disciplinaId,
      disciplinaNome,
      alunos,
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={`Alunos - ${disciplinaNome}`}
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
            <Text style={styles.title}>Alunos Matriculados</Text>
            <Text style={styles.subtitle}>
              Selecione um aluno para lançar notas
            </Text>

            <Button
              mode="contained"
              onPress={lancarNotasEmLote}
              style={styles.loteButton}
              icon="clipboard-list"
            >
              Lançar Notas em Lote
            </Button>

            {loading ? (
              <ActivityIndicator size="large" style={styles.loading} />
            ) : (
              <DataTable style={styles.table}>
                <DataTable.Header>
                  <DataTable.Title style={styles.columnNome}>
                    Aluno
                  </DataTable.Title>
                  <DataTable.Title style={styles.columnMatricula}>
                    Matrícula
                  </DataTable.Title>
                  <DataTable.Title style={styles.columnCurso}>
                    Curso
                  </DataTable.Title>
                  <DataTable.Title style={styles.columnAcoes}>
                    Ações
                  </DataTable.Title>
                </DataTable.Header>

                {alunos.map((aluno) => (
                  <DataTable.Row key={aluno.id}>
                    <DataTable.Cell style={styles.columnNome}>
                      <Text style={styles.alunoNome}>{aluno.nome}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.columnMatricula}>
                      {aluno.matricula}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.columnCurso}>
                      {aluno.curso}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.columnAcoes}>
                      <Button
                        mode="contained"
                        compact
                        onPress={() => lancarNotasAluno(aluno)}
                        style={styles.button}
                        icon="note-edit"
                      >
                        Notas
                      </Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}

                {alunos.length === 0 && !loading && (
                  <DataTable.Row>
                    <DataTable.Cell>
                      <Text style={styles.emptyText}>
                        Nenhum aluno matriculado nesta disciplina
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              </DataTable>
            )}

            <Button
              mode="outlined"
              onPress={carregarAlunos}
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
  loteButton: { marginBottom: 16 },
  table: { marginHorizontal: -8 },
  columnNome: { flex: 2 },
  columnMatricula: { flex: 1.2 },
  columnCurso: { flex: 1.5 },
  columnAcoes: { flex: 1 },
  alunoNome: { fontWeight: "500" },
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
