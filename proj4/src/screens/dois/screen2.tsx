import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, View, Dimensions } from "react-native";
import styles from "./styles";

const Screen2: React.FC = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  useEffect(() => {
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    // Detecta a orientação inicial
    handleOrientationChange();

    // Adiciona listener para mudanças de dimensão
    const subscription = Dimensions.addEventListener('change', handleOrientationChange);

    // Remove listener ao desmontar
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[styles.container, { flexDirection: orientation === 'portrait' ? 'column' : 'row' }]}>
      <View style={styles.top}>
        <Text>Top</Text>
      </View>
      <View style={styles.middle}>
        <Text>Middle</Text>
      </View>
      <View style={styles.bottom}>
        <Text>Bottom</Text>
      </View>
    </SafeAreaView>
  );
};

export default Screen2;