import { Colors, responsiveHeight, responsiveWidth } from '@resources';
import { StyleSheet } from 'react-native';
import { textStyle } from '../../resources/CommonStyle';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#48a9f8',
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 5,
    marginBottom: 10,
  },
  productImage: {
    height: 200,
    resizeMode: 'contain',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#bce0fb',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  infoText: {
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },
  button: { width: 140, alignSelf: 'center', paddingHorizontal: 20, borderRadius: 10, alignItems: 'center', marginTop: 20, backgroundColor: "#2b6ecc", flexDirection: 'row', justifyContent: 'center' },
  card: {
    backgroundColor: '#f5f5f5',
  },
});

export { styles };
