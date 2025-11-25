import React from "react";
import { Card, Text, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function MenuCard({ 
  title, 
  subtitle, 
  icon, 
  onPress, 
  color = "#2196F3" 
}: any) {
  return (
    <Card 
      style={[styles.card, { borderLeftColor: color }]} 
      onPress={onPress}
    >
      <View style={styles.content}>
        <IconButton 
          icon={icon} 
          size={32} 
          iconColor={color}
        />
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="bodyMedium" style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 4,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#666",
    fontSize: 14,
  },
});
