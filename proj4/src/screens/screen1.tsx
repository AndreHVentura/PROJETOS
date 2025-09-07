import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";

export default function Screen1() {
  const { width, height } = useWindowDimensions();

  const isPortrait = height >= width;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isPortrait ? "#FFA500" : "#1E90FF" },
      ]}
    >
      <Text style={styles.text}>
        Tela em modo {isPortrait ? "portrait" : "landscape"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 18,
  },
});