import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      backgroundColor: '#3498db',
      color: '#fff',
      padding: 12,
      textAlign: 'center',
      borderRadius: 6,
    },
    summaryBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#dff0fe',
      padding: 10,
      marginVertical: 10,
      borderRadius: 6,
    },
    summaryText: {
      fontSize: 16,
      fontWeight: '600',
    },
    itemCard: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#999',
      padding: 10,
      marginBottom: 10,
      borderRadius: 6,
      backgroundColor: '#fff',
    },
    image: {
      width: 70,
      height: 70,
      marginRight: 10,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 15,
      fontWeight: '500',
    },
    price: {
      fontSize: 14,
      marginVertical: 4,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    quantityText: {
      marginHorizontal: 10,
      fontSize: 15,
    },
    checkoutBtn: {
      backgroundColor: '#007BFF',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    checkoutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });