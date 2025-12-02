import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import {
  Card,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import api from "../services/api";
import CustomHeader from "../components/Header";
import NotificationBanner from "../components/Notification";

export default function LancarNotasAlunoScreen({ route, navigation }: any) {
  const { aluno, disciplinaId, disciplinaNome } = route.params;

  const [notas, setNotas] = useState({
    nota1: "",
    nota2: "",
    nota3: "",
    nota4: "",
    nota5: "",
  });

  const [notaExistente, setNotaExistente] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    buscarNotaExistente();
  }, []);

  const buscarNotaExistente = async () => {
    try {
      setLoading(true);
      // Buscar se já existe nota para este aluno nesta disciplina
      const res = await api.get(
        `/nota/aluno/${aluno.id}/disciplina/${disciplinaId}`
      );

      if (res.data && res.data.id) {
        setNotaExistente(res.data);
        setNotas({
          nota1: res.data.nota1?.toString() || "",
          nota2: res.data.nota2?.toString() || "",
          nota3: res.data.nota3?.toString() || "",
          nota4: res.data.nota4?.toString() || "",
          nota5: res.data.nota5?.toString() || "",
        });
      }
    } catch (error) {
      // Nota não existe ainda - isso é normal
      console.log("Nenhuma nota existente encontrada");
    } finally {
      setLoading(false);
    }
  };

  const calcularMedia = () => {
    const notasArray = [
      parseFloat(notas.nota1) || 0,
      parseFloat(notas.nota2) || 0,
      parseFloat(notas.nota3) || 0,
      parseFloat(notas.nota4) || 0,
      parseFloat(notas.nota5) || 0,
    ].filter((nota) => nota > 0);

    if (notasArray.length === 0) return 0;

    const soma = notasArray.reduce((acc, nota) => acc + nota, 0);
    return parseFloat((soma / notasArray.length).toFixed(2));
  };

  const getSituacao = () => {
    const media = calcularMedia();
    if (media >= 7.0) return { texto: "Aprovado", cor: "#4CAF50" };
    if (media >= 5.0) return { texto: "Recuperação", cor: "#FF9800" };
    return { texto: "Reprovado", cor: "#F44336" };
  };

  const validarNotas = () => {
    const valores = Object.values(notas);
    const temNotaValida = valores.some(
      (nota) =>
        nota &&
        !isNaN(parseFloat(nota)) &&
        parseFloat(nota) >= 0 &&
        parseFloat(nota) <= 10
    );

    if (!temNotaValida) {
      setMessage("Informe pelo menos uma nota válida (0-10)");
      return false;
    }

    // Verificar se todas as notas estão entre 0 e 10
    for (const [key, value] of Object.entries(notas)) {
      if (value && (parseFloat(value) < 0 || parseFloat(value) > 10)) {
        setMessage(`Nota ${key} deve estar entre 0 e 10`);
        return false;
      }
    }

    return true;
  };

  const salvarNotas = async () => {
    if (!validarNotas()) return;

    setSubmitting(true);
    try {
      const media = calcularMedia();
      const situacao = getSituacao().texto;

      const dados = {
        alunoMatricula: aluno.matricula,
        disciplinaId,
        nota1: notas.nota1 ? parseFloat(notas.nota1) : null,
        nota2: notas.nota2 ? parseFloat(notas.nota2) : null,
        nota3: notas.nota3 ? parseFloat(notas.nota3) : null,
        nota4: notas.nota4 ? parseFloat(notas.nota4) : null,
        nota5: notas.nota5 ? parseFloat(notas.nota5) : null,
      };

      if (notaExistente) {
        // Atualizar nota existente
        await api.put(`/nota/${notaExistente.id}`, dados);
        setMessage("Notas atualizadas com sucesso!");
      } else {
        // Criar nova nota
        await api.post("/nota", dados);
        setMessage("Notas lançadas com sucesso!");
      }

      // Atualizar dados locais
      await buscarNotaExistente();

      // Voltar após 2 segundos
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao salvar notas:", error);
      setMessage(error.response?.data?.error || "Erro ao salvar notas");
    } finally {
      setSubmitting(false);
    }
  };

  const media = calcularMedia();
  const situacao = getSituacao();

  return (
    <View style={styles.container}>
      <CustomHeader
        title={`Lançar Notas - ${aluno.nome}`}
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
            <Text style={styles.title}>Lançar Notas</Text>

            <Text style={styles.subtitle}>Disciplina: {disciplinaNome}</Text>

            <Card style={styles.infoCard}>
              <Card.Content>
                <Text style={styles.infoTitle}>Aluno</Text>
                <Text style={styles.infoText}>Nome: {aluno.nome}</Text>
                <Text style={styles.infoText}>
                  Matrícula: {aluno.matricula}
                </Text>
                <Text style={styles.infoText}>Curso: {aluno.curso}</Text>
              </Card.Content>
            </Card>

            {loading ? (
              <ActivityIndicator size="large" style={styles.loading} />
            ) : (
              <>
                <Text style={styles.sectionTitle}>Notas</Text>

                {[1, 2, 3, 4, 5].map((num) => (
                  <TextInput
                    key={num}
                    label={`Nota ${num}`}
                    mode="outlined"
                    value={notas[`nota${num}` as keyof typeof notas]}
                    onChangeText={(text) =>
                      setNotas({ ...notas, [`nota${num}`]: text })
                    }
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="0.0"
                  />
                ))}

                <Card style={styles.resumoCard}>
                  <Card.Content>
                    <Text style={styles.resumoTitle}>Resumo</Text>
                    <Text style={styles.resumoText}>
                      Média:{" "}
                      <Text style={{ fontWeight: "bold", color: "#333" }}>
                        {media}
                      </Text>
                    </Text>
                    <Text
                      style={[
                        styles.resumoText,
                        { color: situacao.cor, fontWeight: "bold" },
                      ]}
                    >
                      Situação: {situacao.texto}
                    </Text>
                  </Card.Content>
                </Card>

                <Button
                  mode="contained"
                  onPress={salvarNotas}
                  loading={submitting}
                  disabled={submitting}
                  style={styles.saveButton}
                  icon={notaExistente ? "update" : "check"}
                >
                  {notaExistente ? "Atualizar Notas" : "Salvar Notas"}
                </Button>

                <Text style={styles.instructions}>
                  {`• Digite notas de 0 a 10
                    • Campos vazios serão considerados como 0
                    • Média calculada apenas com notas válidas (> 0)
                    • Aprovado ≥ 7.0 | Recuperação ≥ 5.0 | Reprovado < 5.0`}
                </Text>
              </>
            )}
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
  subtitle: { fontSize: 16, color: "#666", marginBottom: 16 },
  infoCard: { backgroundColor: "#f5f5f5", marginBottom: 20 },
  infoTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  infoText: { fontSize: 14, color: "#333", marginBottom: 4 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#333",
  },
  input: { marginBottom: 12 },
  resumoCard: { backgroundColor: "#e8f5e8", marginVertical: 20 },
  resumoTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  resumoText: { fontSize: 14, marginBottom: 4 },
  saveButton: { marginTop: 10, marginBottom: 20 },
  instructions: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    lineHeight: 18,
  },
  loading: { marginVertical: 40 },
});
