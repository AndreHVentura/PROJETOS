import React from "react";
import { View, Text, Button, StyleSheet, Linking, Alert } from "react-native";

export default function Screen2() {
  const openDialer = async () => {
    const phoneNumber = "12982501446";

    const url = `tel:${phoneNumber}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erro", "Não foi possível abrir o discador.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrir discador</Text>
      <Button title="Ligar para o número" onPress={openDialer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});