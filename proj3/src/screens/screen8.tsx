import React, { useState } from "react";
import { View, Image, StyleSheet, StatusBar, Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function Screen8() {
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

  // Remover imagem pelo índice
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
          <View key={index} style={styles.imageContainer}>
            {/* Botão de remover */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => removeImage(index)}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>

            {/* Imagem */}
            <Image source={{ uri }} style={styles.image} />
          </View>
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
    paddingTop: 80,
    alignItems: "center",
    paddingBottom: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
    padding: 2,
    zIndex: 2,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});