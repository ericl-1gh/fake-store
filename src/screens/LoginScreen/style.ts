import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#3f3fbf',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    marginBottom: 4,
    marginTop: 10,
    fontWeight: '500',
  },  
  input: {
    backgroundColor: '#d6d6f7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2626a8',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 16,
  },
  switchText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
