import React from "react";
import { Card, Text, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function MenuCard({ title, icon, onPress }: any) {
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <IconButton icon={icon} size={32} />
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  title: {
    marginLeft: 10,
  },
});
