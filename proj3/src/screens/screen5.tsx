import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";

interface Contact {
  id: string;
  firstName?: string;
}

export default function Screen5() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    (async () => {
      // Pede permissão
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        // Busca contatos apenas com o primeiro nome
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName],
        });

        if (data.length > 0) {
          setContacts(data as Contact[]);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Primeiro Nome dos Contatos</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>
              {item.firstName ?? "Sem nome"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum contato encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
  },
});