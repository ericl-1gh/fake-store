// ShoppingCartScreen.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For plus/minus icons
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { incrementQuantity, decrementQuantity } from '../store/actions/cartActions'; // adjust path

type Props = {};


const OrderScreen = (props: Props) => {
    const cartItems = useSelector((state: any) => state.cart.items);
    const dispatch = useDispatch();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems
        .reduce((sum, item) => sum + item.quantity * item.price, 0)
        .toFixed(2);

    const renderItem = ({ item }: any) => (
        <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>Price: ${item.price}</Text>
                <View style={styles.quantityRow}>
                    <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))}>
                        <Icon name="remove-circle" size={24} color="green" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>quantity: {item.quantity}</Text>
                    <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))}>
                        <Icon name="add-circle" size={24} color="green" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Shopping Cart</Text>

            <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>Items: {totalItems}</Text>
                <Text style={styles.summaryText}>Total Price: ${totalPrice}</Text>
            </View>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <TouchableOpacity style={styles.checkoutBtn}>
                <Text style={styles.checkoutText}>Check Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export { OrderScreen };


