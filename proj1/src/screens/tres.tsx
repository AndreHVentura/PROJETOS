import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function Tres() {
  return (
    <View style={styles.container}>
      {/* Parte de cima (crimson) */}
      <View style={styles.top}>
        {/* Esquerda lime */}
        <View style={styles.left} />

        {/* Direita dividida em duas (teal e skyblue) */}
        <View style={styles.right}>
          <View style={styles.teal} />
          <View style={styles.skyblue} />
        </View>
      </View>

      {/* Parte de baixo (salmon) */}
      <View style={styles.bottom} />
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
    backgroundColor: "crimson",
    flexDirection: "row", // lado a lado
  },
  left: {
    flex: 0.5,
    backgroundColor: "lime",
  },
  right: {
    flex: 0.5,
    flexDirection: "column", // divide em cima/baixo
  },
  teal: {
    flex: 0.5,
    backgroundColor: "teal",
  },
  skyblue: {
    flex: 0.5,
    backgroundColor: "skyblue",
  },
  bottom: {
    flex: 0.5,
    backgroundColor: "salmon",
  },
});