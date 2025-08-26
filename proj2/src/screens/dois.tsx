import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function Dois() {
  return (
    <View style={styles.container}>
      {/* Parte de cima (crimson) */}
      <View style={styles.top}>
        <View style={styles.left} />
        <View style={styles.right} />
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
    flexDirection: "column", // vertical
  },
  top: {
    flex: 0.5,
    backgroundColor: "crimson",
    flexDirection: "row", // divide em linha
  },
  left: {
    flex: 0.5,
    backgroundColor: "lime",
  },
  right: {
    flex: 0.5,
    backgroundColor: "aquamarine",
  },
  bottom: {
    flex: 0.5,
    backgroundColor: "salmon",
  },
});