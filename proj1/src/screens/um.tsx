import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function Um() {
  return (
    <View style={styles.container}>
      <View style={styles.top} />
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
  },
  bottom: {
    flex: 0.5,
    backgroundColor: "salmon",
  },
});