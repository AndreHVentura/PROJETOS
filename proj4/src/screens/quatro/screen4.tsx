import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Dimensions } from 'react-native';
import stylePortrait from './styleVertical';
import styleLandscape from './styleHorizontal';

const Screen4: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(true);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Só mostra Top se estiver no modo retrato */}
      {isPortrait && (
        <View style={styles.top}>
          <Text>Exercício 4</Text>
        </View>
      )}

      <View style={styles.middle}>
        <Text>Middle</Text>
      </View>

      <View style={styles.bottom}>
        <Text>Bottom</Text>
      </View>
    </SafeAreaView>
  );
};

export default Screen4;