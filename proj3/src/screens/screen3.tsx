import React from "react";
import { View, Text, Button, StyleSheet, Linking, Alert } from "react-native";

export default function Screen3() {
  const openInstagram = async () => {
    const url = "https://www.instagram.com/fatec_jacarei";

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erro", "Não foi possível abrir o Instagram.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrir Instagram da Fatec Jacareí</Text>
      <Button title="Abrir Instagram" onPress={openInstagram} />
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