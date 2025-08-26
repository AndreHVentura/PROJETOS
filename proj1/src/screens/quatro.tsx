import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";

// importa a imagem padrão do Expo (pode trocar por outra na pasta assets)
import logo from "../assets/adaptive-icon.png";

export default function Quatro() {
  return (
    <View style={styles.container}>
      {/* Parte de cima */}
      <View style={styles.top}>
        {/* Esquerda lime */}
        <View style={styles.left}>
          <Image source={logo} style={styles.image} resizeMode="contain" />
        </View>

        {/* Direita (duas colunas) */}
        <View style={styles.right}>
          <View style={styles.teal}>
            <Image source={logo} style={styles.image} resizeMode="contain" />
          </View>
          <View style={styles.skyblue}>
            <Image source={logo} style={styles.image} resizeMode="contain" />
          </View>
        </View>
      </View>

      {/* Parte de baixo (salmon) */}
      <View style={styles.bottom}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
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
    backgroundColor: "crimson",
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
    flex: 1,
    alignSelf: "center",
    width: "80%",
    height: "80%",
  },
});