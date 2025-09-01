import React, { useState } from "react";
import { View, Image, StyleSheet, StatusBar, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function Screen6() {
  const [image, setImage] = useState<string | null>(null);

  // Abrir galeria
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "É necessário permitir acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Abrir câmera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "É necessário permitir acesso à câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botões no canto superior direito */}
      <View style={styles.buttonsContainer}>
        <MaterialIcons
          name="photo"
          size={32}
          color="deepskyblue"
          style={styles.icon}
          onPress={pickImage}
        />
        <MaterialIcons
          name="photo-camera"
          size={32}
          color="deepskyblue"
          style={styles.icon}
          onPress={takePhoto}
        />
      </View>

      {/* Exibir imagem selecionada ou tirada */}
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    position: "absolute",
    top: StatusBar.currentHeight || 20, // usa altura da StatusBar
    right: 20,
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 50,
    borderRadius: 10,
  },
});