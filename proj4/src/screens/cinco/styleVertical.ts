import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const stylePortrait = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FF6347',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA07A',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    padding: 10,
    backgroundColor: '#F08080',
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
    borderBottomColor: '#ddd',
    backgroundColor: '#FF7F7F',
  },
});

export default stylePortrait;