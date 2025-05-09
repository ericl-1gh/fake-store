// ShoppingCartScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'; // For plus/minus icons
import {
    incrementQuantity,
    decrementQuantity,
    setOrderItems,
    setCartItems,
} from '../../store/actions/cartActions'; // Adjust path if needed
import { RootState } from '@store';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@resources';
import { performGetRequestServer, performPostRequestServer, performPutRequestServer } from '@actions';
import { endpoints } from '@services';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';
import { useFocusEffect } from '@react-navigation/native';

type Props = {};


const CartScreen = (props: Props) => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const dispatch = useDispatch();
    const token = useSelector(state => state.userDetails.profileDetails?.token);
    const [fetchedCartItems, setFetchedCartItems] = useState();

    const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = cartItems
        .reduce((sum, item) => sum + item.count * item.price, 0)
        .toFixed(2);

    const cartAdded = async () => {
        let cartItems = await performGetRequestServer(endpoints.cart, token)();
        setFetchedCartItems(cartItems.data.items);
    }

    useFocusEffect(
        useCallback(() => {
            cartAdded();
        }, [cartItems])
    );

    const handleIncrement = async (product) => {
        const updatedCartItems = fetchedCartItems.map(item =>
            item.id === product.id
                ? { ...item, count: item.count + 1 }
                : item
        );

        const requestBody = { items: updatedCartItems };

        try {
            const cartAdded = await performPutRequestServer(endpoints.cart, requestBody, token)();
            if (cartAdded.status === "OK") {
                dispatch(incrementQuantity(product.id));
                // cartAdded();
            }
        } catch (error) {
            console.error("Error incrementing product:", error);
        }
    };


    const handleDecrement = async (product) => {
        const updatedCartItems = fetchedCartItems
            .map(item =>
                item.id === product.id
                    ? { ...item, count: item.count - 1 }
                    : item
            )
            .filter(item => item.count > 0); // Remove if count goes to 0

        const requestBody = { items: updatedCartItems };

        try {
            const cartAdded = await performPutRequestServer(endpoints.cart, requestBody, token)();
            if (cartAdded.status === "OK") {
                dispatch(decrementQuantity(product.id));
                // cartAdded();
            }
        } catch (error) {
            console.error("Error decrementing product:", error);
        }
    };

    const checkOut = async () => {
        const orderItems = fetchedCartItems?.map(({ id, count, ...rest }) => ({
            prodID: id,
            quantity: count,
            ...rest,
        }));

        const orderRequestBody = {
            items: orderItems,
        };

        const orderCreated = await performPostRequestServer(endpoints.ordercreate, orderRequestBody, token)();
        if (orderCreated.status == "OK") {
            const requestBody = { items: [] };

            const cartAdded = await performPutRequestServer(endpoints.cart, requestBody, token)();

            dispatch(setCartItems([]));

        }
    }



    const renderItem = ({ item }: any) => (
        <View style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>Price: ${item.price}</Text>
                <View style={styles.quantityRow}>
                    <TouchableOpacity onPress={() => { handleDecrement(item) }}>
                        <Icon name="remove-circle" size={24} color="green" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>quantity: {item.count}</Text>
                    <TouchableOpacity onPress={() => { handleIncrement(item) }}>
                        <Icon name="add-circle" size={24} color="green" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Shopping Cart</Text>

            {fetchedCartItems?.length > 0 && <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>Items: {totalItems}</Text>
                <Text style={styles.summaryText}>Total Price: ${totalPrice}</Text>
            </View>}

            <FlatList
                data={fetchedCartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {fetchedCartItems?.length == 0 && <View style={{ flex: 1 }}><Text style={styles.emptycarttxt}>Your cart is empty!</Text></View>}

            {fetchedCartItems?.length > 0 && <><View style={{ flex: 1, borderBottomWidth: 1, borderColor: Colors.black }}></View>
                <TouchableOpacity style={styles.button}
                    onPress={() => { checkOut() }}>
                    <Icon
                        name={'wallet'}
                        size={20}
                        color={Colors.offWhite}
                    />
                    <Text
                        style={{ alignSelf: 'center', paddingVertical: 10, marginLeft: 10, color: Colors.offWhite }}

                    >
                        Check Out
                    </Text>
                </TouchableOpacity></>}
        </SafeAreaView>
    );
};

export { CartScreen };


