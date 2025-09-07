import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Dimensions, TextInput, FlatList } from 'react-native';
import stylePortrait from './styleVertical';
import styleLandscape from './styleHorizontal';

const Screen5: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(true);
  const [name, setName] = useState('');
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const detectOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setIsPortrait(height >= width);
    };

    detectOrientation();
    const subscription = Dimensions.addEventListener('change', detectOrientation);

    return () => subscription.remove();
  }, []);

  const styles = isPortrait ? stylePortrait : styleLandscape;

  const handleAddName = () => {
    if (name.trim() !== '') {
      setNames([...names, name.trim()]);
      setName('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercício 5</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
          onSubmitEditing={handleAddName}
          returnKeyType="done"
        />
      </View>

      <FlatList
        data={names}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Screen5;