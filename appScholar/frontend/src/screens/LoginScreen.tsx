import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationBanner from "../components/Notification";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginScreen({ navigation, toggleTheme }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      setMessage("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, senha });
      await AsyncStorage.setItem("token", res.data.token);
      navigation.replace("Home", { perfil: res.data.perfil });
    } catch (err) {
      setMessage("Senha ou E-mail incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <ThemeToggle toggleTheme={toggleTheme} />
      </View>

      <NotificationBanner
        visible={!!message}
        message={message}
        onDismiss={() => setMessage("")}
      />

      <Card style={styles.card}>
        <Card.Title title="Login Acadêmico" titleStyle={styles.title} />
        <Card.Content>
          <TextInput
            label="E-mail"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            label="Senha"
            mode="outlined"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={{ marginTop: 15 }}
          >
            Entrar
          </Button>
        </Card.Content>
      </Card>

      <Text style={styles.footerText}>
        © 2025 AppScholar — Sistema Acadêmico
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  topBar: {
    position: "absolute",
    top: 40,
    right: 15,
  },
  card: {
    padding: 10,
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
});
