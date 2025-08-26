import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Constants from "expo-constants";
import logo from "../assets/adaptive-icon.png";

export default function Cinco() {
  // função que será chamada ao clicar na imagem
  const handlePress = () => {
    Alert.alert("Boa noite!");
  };

  return (
    <View style={styles.container}>
      {/* Parte de cima */}
      <View style={styles.top}>
        {/* Esquerda lime */}
        <View style={styles.left}>
          <TouchableOpacity onPress={handlePress}>
            <Image source={logo} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Direita (duas colunas) */}
        <View style={styles.right}>
          <View style={styles.teal}>
            <TouchableOpacity onPress={handlePress}>
              <Image source={logo} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={styles.skyblue}>
            <TouchableOpacity onPress={handlePress}>
              <Image source={logo} style={styles.image} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Parte de baixo (salmon) */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={logo} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    flexDirection: "column",
  },
  top: {
    flex: 0.5,
    flexDirection: "row",
  },
  left: {
    flex: 0.5,
    backgroundColor: "lime",
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 0.5,
    flexDirection: "column",
  },
  teal: {
    flex: 0.5,
    backgroundColor: "teal",
    justifyContent: "center",
    alignItems: "center",
  },
  skyblue: {
    flex: 0.5,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    flex: 0.5,
    backgroundColor: "salmon",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 64,
    height: 64,
  },
});