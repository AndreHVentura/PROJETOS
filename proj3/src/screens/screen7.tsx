import React, { useState } from "react";
import { View, Image, StyleSheet, StatusBar, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function Screen7() {
  const [images, setImages] = useState<string[]>([]);

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
      setImages((prev) => [...prev, result.assets[0].uri]);
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
      setImages((prev) => [...prev, result.assets[0].uri]);
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

      {/* Exibir imagens em ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 20,
  },
  buttonsContainer: {
    position: "absolute",
    top: StatusBar.currentHeight || 20,
    right: 20,
    flexDirection: "row",
    zIndex: 1,
  },
  icon: {
    marginLeft: 15,
  },
  scrollContainer: {
    paddingTop: 80, // espaço para não cobrir as imagens pelos botões
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
});