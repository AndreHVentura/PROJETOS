import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";

interface Contact {
  id: string;
  name: string;
  phoneNumbers?: { number: string }[];
}

export default function Screen4() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    (async () => {
      // Pede permissão
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          // Filtra contatos cujo nome começa com "C"
          const filtered = data.filter(
            (contact) => contact.name && contact.name.startsWith("C")
          );

          setContacts(filtered as Contact[]);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contatos que começam com C</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactName}>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 && (
              <Text style={styles.contactPhone}>
                {item.phoneNumbers[0].number}
              </Text>
            )}
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
  contactPhone: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    color: "#888",
  },
});