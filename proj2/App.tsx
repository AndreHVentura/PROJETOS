import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "./src/types";
import { CepProvider } from "./src/context/CepContext";
import Um from "./src/screens/um";
import Dois from "./src/screens/dois";
import Tres from "./src/screens/tres";
import Quatro from "./src/screens/quatro";
import Cinco from "./src/screens/cinco";
import Seis from "./src/screens/seis";
import Sete from "./src/screens/sete";
import Oito from "./src/screens/oito";
import Nove from "./src/screens/nove";
import Dez from "./src/screens/dez";
import Onze from "./src/screens/onze";
import ViaCep from "./src/screens/viaCEP";
import ConsultasCEP from "./src/screens/doze";

const Drawer = createDrawerNavigator<RootStackParamList>();

export default function App() {
  return (
    <CepProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Um"
          screenOptions={({ route }) => ({
            drawerIcon: ({ color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = "home";

              switch (route.name) {
                case "Um":
                  iconName = "home-outline";
                  break;
                case "Dois":
                  iconName = "book-outline";
                  break;
                case "Tres":
                  iconName = "bar-chart-outline";
                  break;
                case "Quatro":
                  iconName = "analytics-outline";
                  break;
                case "Cinco":
                  iconName = "calculator-outline";
                  break;
                case "Seis":
                  iconName = "clipboard-outline";
                  break;
                case "Sete":
                  iconName = "calendar-outline";
                  break;
                case "Oito":
                  iconName = "construct-outline";
                  break;
                case "Nove":
                  iconName = "search-outline";
                  break;
                case "Dez":
                  iconName = "briefcase-outline";
                  break;
                case "Onze":
                  iconName = "document-text-outline";
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Drawer.Screen
            name="Um"
            component={Um}
            options={{ title: "Exercício 1" }}
          />
          <Drawer.Screen
            name="Dois"
            component={Dois}
            options={{ title: "Exercício 2" }}
          />
          <Drawer.Screen
            name="Tres"
            component={Tres}
            options={{ title: "Exercício 3" }}
          />
          <Drawer.Screen
            name="Quatro"
            component={Quatro}
            options={{ title: "Exercício 4" }}
          />
          <Drawer.Screen
            name="Cinco"
            component={Cinco}
            options={{ title: "Exercício 5" }}
          />
          <Drawer.Screen
            name="Seis"
            component={Seis}
            options={{ title: "Exercício 6" }}
          />
          <Drawer.Screen
            name="Sete"
            component={Sete}
            options={{ title: "Exercício 7" }}
          />
          <Drawer.Screen
            name="Oito"
            component={Oito}
            options={{ title: "Exercício 8" }}
          />
          <Drawer.Screen
            name="Nove"
            component={Nove}
            options={{ title: "Exercício 9" }}
          />
          <Drawer.Screen
            name="Dez"
            component={Dez}
            options={{ title: "Exercício 10" }}
          />
          <Drawer.Screen
            name="Onze"
            component={Onze}
            options={{ title: "Exercício 11" }}
          />
          <Drawer.Screen name="ViaCEP" component={ViaCep} />
          <Drawer.Screen name="Consultas de CEP" component={ConsultasCEP} />
        </Drawer.Navigator>
      </NavigationContainer>
    </CepProvider>
  );
}
