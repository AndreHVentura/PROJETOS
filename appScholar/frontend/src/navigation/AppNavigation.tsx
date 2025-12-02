import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AlunoScreen from "../screens/AlunoScreen";
import ProfessorScreen from "../screens/ProfessorScreen";
import DisciplinaScreen from "../screens/DisciplinaScreen";
import BoletimScreen from "../screens/BoletimScreen";
import ProtectedRoute from "../components/ProtectedRoute";
import CadastroScreen from "../screens/CadastroScreen";
import ListaAlunosScreen from "../screens/ListaAluno";
import ListaProfessoresScreen from "../screens/ListaProfessor";
import ListaDisciplinasScreen from "../screens/ListaDisciplina";
import NotaScreen from "../screens/NotaListScreen";
import LancarNotasScreen from "../screens/LancarNotasLoteScreen";
import AlunoNotaScreen from "../screens/AlunoNotaScreen";
import ProfessorDisciplinasScreen from "../screens/ProfessorDisciplinaScreen";
import AlunosDisciplinaScreen from "../screens/AlunoDisciplinaScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator({
  toggleTheme,
}: {
  toggleTheme: () => void;
}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4CAF50",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {/* TELA DE LOGIN */}
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {({ navigation }) => (
            <LoginScreen navigation={navigation} toggleTheme={toggleTheme} />
          )}
        </Stack.Screen>

        {/* TELA DE CADASTRO */}
        <Stack.Screen name="CadastroScreen" options={{ title: "Cadastro" }}>
          {({ navigation }) => (
            <CadastroScreen navigation={navigation} toggleTheme={toggleTheme} />
          )}
        </Stack.Screen>

        {/* TELA PRINCIPAL */}
        <Stack.Screen
          name="Home"
          options={{
            title: "AppScholar",
            headerBackVisible: false,
          }}
        >
          {({ navigation }) => (
            <ProtectedRoute navigation={navigation}>
              <HomeScreen navigation={navigation} toggleTheme={toggleTheme} />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        {/* MÓDULO DE ALUNOS */}
        <Stack.Screen
          name="AlunoScreen"
          options={{ title: "Gerenciar Alunos" }}
        >
          {({ navigation }) => (
            <ProtectedRoute
              navigation={navigation}
              requiredPerfil={["admin", "professor"]}
            >
              <AlunoScreen navigation={navigation} toggleTheme={toggleTheme} />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        <Stack.Screen name="ListaAlunos" options={{ title: "Lista de Alunos" }}>
          {({ navigation }) => (
            <ProtectedRoute
              navigation={navigation}
              requiredPerfil={["admin", "professor"]}
            >
              <ListaAlunosScreen navigation={navigation} />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        {/* MÓDULO DE PROFESSORES */}
        <Stack.Screen
          name="ProfessorScreen"
          options={{ title: "Gerenciar Professores" }}
        >
          {({ navigation }) => (
            <ProtectedRoute navigation={navigation} requiredPerfil={["admin"]}>
              <ProfessorScreen
                navigation={navigation}
                toggleTheme={toggleTheme}
              />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ListaProfessores"
          options={{ title: "Lista de Professores" }}
        >
          {({ navigation }) => (
            <ProtectedRoute navigation={navigation} requiredPerfil={["admin"]}>
              <ListaProfessoresScreen navigation={navigation} />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        {/* MÓDULO DE DISCIPLINAS */}
        <Stack.Screen
          name="DisciplinaScreen"
          options={{ title: "Gerenciar Disciplinas" }}
        >
          {({ navigation }) => (
            <ProtectedRoute
              navigation={navigation}
              requiredPerfil={["admin", "professor"]}
            >
              <DisciplinaScreen
                navigation={navigation}
                toggleTheme={toggleTheme}
              />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ListaDisciplinas"
          options={{ title: "Lista de Disciplinas" }}
        >
          {({ navigation }) => (
            <ProtectedRoute
              navigation={navigation}
              requiredPerfil={["admin", "professor"]}
            >
              <ListaDisciplinasScreen navigation={navigation} />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        {/* MÓDULO DE BOLETIM */}
        <Stack.Screen
          name="BoletimScreen"
          options={{ title: "Boletim Acadêmico" }}
        >
          {({ navigation }) => (
            <ProtectedRoute navigation={navigation}>
              <BoletimScreen
                navigation={navigation}
                toggleTheme={toggleTheme}
              />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        {/* MÓDULO DE NOTAS - VERSÃO ANTIGA */}
        <Stack.Screen name="NotaScreen" options={{ title: "Notas" }}>
          {({ navigation }) => (
            <ProtectedRoute
              navigation={navigation}
              requiredPerfil={["admin", "professor"]}
            >
              <NotaScreen navigation={navigation} />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        {/* NOVO MÓDULO - FLUXO COMPLETO */}
        <Stack.Screen
          name="ProfessorDisciplinas"
          options={{ title: "Minhas Disciplinas" }}
        >
          {({ navigation }) => (
            <ProtectedRoute
              navigation={navigation}
              requiredPerfil={["professor", "admin"]}
            >
              <ProfessorDisciplinasScreen navigation={navigation} />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="AlunosDisciplina"
          options={({ route }: any) => ({
            title: route.params?.disciplinaNome || "Alunos",
          })}
        >
          {({ navigation, route }: any) => (
            <ProtectedRoute
              navigation={navigation}
              requiredPerfil={["professor", "admin"]}
            >
              <AlunosDisciplinaScreen navigation={navigation} route={route} />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        {/* LANÇAR NOTAS INDIVIDUAL */}
        <Stack.Screen
          name="AlunoNotaScreen"
          options={({ route }: any) => ({
            title: route.params?.aluno?.nome
              ? `Notas - ${route.params.aluno.nome}`
              : "Lançar Notas",
          })}
        >
          {({ navigation, route }: any) => (
            <ProtectedRoute
              navigation={navigation}
              requiredPerfil={["professor", "admin"]}
            >
              <AlunoNotaScreen navigation={navigation} route={route} />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        {/* LANÇAR NOTAS EM LOTE */}
        <Stack.Screen
          name="LancarNotasScreen"
          options={({ route }: any) => ({
            title: route.params?.disciplinaNome
              ? `Notas - ${route.params.disciplinaNome}`
              : "Lançar Notas",
          })}
        >
          {({ navigation, route }: any) => (
            <ProtectedRoute
              navigation={navigation}
              requiredPerfil={["professor", "admin"]}
            >
              <LancarNotasScreen navigation={navigation} route={route} />
            </ProtectedRoute>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
