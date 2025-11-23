import React from "react";
import {View, StyleSheet, Text} from "react-native";
import { Button } from "react-native-paper";

interface HeaderProps {
  title: string;
  onLogout: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Header({ title, onLogout, showBackButton = false, onBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {showBackButton && (
          <Button 
            icon="arrow-left" 
            onPress={onBack}
            mode="text"
            textColor="#007AFF"
          >
            Voltar
          </Button>
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.headerRight}>
        <Button 
          icon="logout" 
          onPress={onLogout}
          mode="text"
          textColor="#FF3B30"
        >
          Sair
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 2,
  },
});
