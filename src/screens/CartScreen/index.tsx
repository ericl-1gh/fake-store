// ShoppingCartScreen.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For plus/minus icons
import {
    incrementQuantity,
    decrementQuantity,
} from '../../store/actions/cartActions'; // Adjust path if needed
import { RootState } from '@store';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@resources';

type Props = {};


const CartScreen = (props: Props) => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems
        .reduce((sum, item) => sum + item.quantity * item.price, 0)
        .toFixed(2);

    const renderItem = ({ item }: any) => (
        <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
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

<View style={{flex:1, borderBottomWidth: 1 ,borderColor:Colors.black}}></View>
             <TouchableOpacity style={styles.button}
                  onPress={() => navigation.goBack()}>
                    <Icon
                      name={'wallet'}
                      size={20}
                      color={Colors.offWhite}
                    />
                    <Text
                      style={{alignSelf:'center', paddingVertical:10,marginLeft: 10, color:Colors.offWhite}}
                      
                    >
                      Check Out
                    </Text>
                  </TouchableOpacity>
        </SafeAreaView>
    );
};

export { CartScreen };


