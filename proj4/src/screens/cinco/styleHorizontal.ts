import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styleLandscape = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#D3D3A3',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFE0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#FAFAD2',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#E6E6A3',
  },
});

export default styleLandscape;