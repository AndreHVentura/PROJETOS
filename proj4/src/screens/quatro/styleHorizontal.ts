import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styleLandscape = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
  },
  top: {   // <--- ADICIONADO só para satisfazer o TS
    display: 'none',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAD2',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3A3',
  },
});

export default styleLandscape;