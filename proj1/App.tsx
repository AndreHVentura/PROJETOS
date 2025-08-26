import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onze">
        <Stack.Screen name="Onze" component={Onze} />
        <Stack.Screen name="Um" component={Um} />
        <Stack.Screen name="Dois" component={Dois} />
        <Stack.Screen name="Tres" component={Tres} />
        <Stack.Screen name="Quatro" component={Quatro} />
        <Stack.Screen name="Cinco" component={Cinco} />
        <Stack.Screen name="Seis" component={Seis} />
        <Stack.Screen name="Sete" component={Sete} />
        <Stack.Screen name="Oito" component={Oito} />
        <Stack.Screen name="Nove" component={Nove} />
        <Stack.Screen name="Dez" component={Dez} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
