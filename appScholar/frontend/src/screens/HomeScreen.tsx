import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import MenuCard from "../components/MenuCard";
import NotificationBanner from "../components/Notification";
import ThemeToggle from "../components/ThemeToggle";

export default function HomeScreen({ navigation, toggleTheme }: any) {
  const [showBanner, setShowBanner] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <ProtectedRoute navigation={navigation}>
      <SafeAreaView style={styles.safeArea}>
        <Header title="AppScholar" onLogout={handleLogout} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Bem-vindo ao AppScholar!</Text>
          <ThemeToggle toggleTheme={toggleTheme} />
          <MenuCard
            title="Gerenciar Alunos"
            icon="account-group"
            onPress={() => navigation.navigate("AlunoScreen")}
          />
          <MenuCard
            title="Gerenciar Professores"
            icon="school"
            onPress={() => navigation.navigate("ProfessorScreen")}
          />
          <MenuCard
            title="Gerenciar Disciplinas"
            icon="book-open-page-variant"
            onPress={() => navigation.navigate("DisciplinaScreen")}
          />
          <MenuCard
            title="Ver Boletim"
            icon="file-document-outline"
            onPress={() => navigation.navigate("BoletimScreen")}
          />
          <NotificationBanner
            visible={showBanner}
            message="Bem-vindo de volta! Há atualizações recentes no sistema."
            onDismiss={() => setShowBanner(false)}
          />
        </ScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
});
