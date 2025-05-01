import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleView: {
    backgroundColor: '#48a9f8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  catList: {
    width: 250, // fixed width to align buttons
    paddingVertical: 15,
    marginVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
  },
  catTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f6db2',
  },
});
