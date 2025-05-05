import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: '#4db8ff',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    borderRadius: 5,
    marginBottom: 30,
  },
  infoContainer: {
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontWeight: 'normal',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#0057D9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});