import React from "react";
import { View, Text, Button, StyleSheet, Linking, Alert } from "react-native";

export default function Screen1() {
  const openYoutube = async () => {
    const url = "https://youtu.be/oowBXzfcl90?si=__qiJgNz1jmw8VTQ";

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erro", "Não foi possível abrir o YouTube.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrir vídeo no YouTube</Text>
      <Button title="Abrir YouTube" onPress={openYoutube} />
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