// screens/HomeScreen.tsx - Modifique para usar o hook useAuth
import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import MenuCard from "../components/MenuCard";
import NotificationBanner from "../components/Notification";
import ThemeToggle from "../components/ThemeToggle";

export default function HomeScreen({ navigation, toggleTheme }: any) {
  const [showBanner, setShowBanner] = useState(true);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  const canAccess = (perfis: string[]) => {
    return user && perfis.includes(user.perfil);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="AppScholar" onLogout={handleLogout} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Bem-vindo, {user?.nome}!</Text>
        <Text style={styles.perfil}>Perfil: {user?.perfil}</Text>

        <ThemeToggle toggleTheme={toggleTheme} />

        {/* Menu baseado no perfil */}
        {canAccess(["admin", "professor"]) && (
          <MenuCard
            title="Gerenciar Alunos"
            icon="account-group"
            onPress={() => navigation.navigate("AlunoScreen")}
          />
        )}

        {canAccess(["admin"]) && (
          <MenuCard
            title="Gerenciar Professores"
            icon="school"
            onPress={() => navigation.navigate("ProfessorScreen")}
          />
        )}

        {canAccess(["admin"]) && (
          <MenuCard
            title="Gerenciar Disciplinas"
            icon="book-open-page-variant"
            onPress={() => navigation.navigate("DisciplinaScreen")}
          />
        )}

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
  );
}

// Adicione estes styles:
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  welcome: {
    fontSize: 22,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  perfil: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
});
