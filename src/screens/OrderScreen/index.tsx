// OrderScreen.tsx
import React, { useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { performGetRequestServer, performPostRequestServer, performPutRequestServer } from '@actions';
import { endpoints } from '@services';
import { styles } from './style';
import { setOrderItems } from 'store/actions/orderActions';

const OrderScreen = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.userDetails.profileDetails?.token);
    const [expandedOrderIds, setExpandedOrderIds] = useState([]);
    const [orders, setOrders] = useState({
        new: [],
        paid: [],
        delivered: [],
    });

    const fetchOrders = async () => {
        try {
            const res = await performGetRequestServer(endpoints.fetchorders, token)();
            const items = res.data.orders;
            const categorized = { new: [], paid: [], delivered: [] };

            items?.forEach((order) => {
                if (order.is_delivered) categorized.delivered.push(order);
                else if (order.is_paid) categorized.paid.push(order);
                else categorized.new.push(order);
            });
            dispatch(setOrderItems(items ?? []));
            setOrders(categorized);
        } catch (err) {
            console.error("Order fetch failed", err);
            Alert.alert("Error", "Failed to fetch orders");
        }
    };

    useFocusEffect(useCallback(() => { fetchOrders(); }, []));

    const toggleExpand = (id: number) => {
        setExpandedOrderIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const updateOrderStatus = async (order: any, type: 'pay' | 'deliver') => {
        try {
            const payload =
                type === 'pay' ? { orderID: order.id, isPaid: 1, isDelivered: order.is_delivered } : { orderID: order.id, isDelivered: 1, isPaid: order.is_paid };
            const response = await performPostRequestServer(endpoints.updateOrder, payload, token)();
            fetchOrders();
            // Alert.alert("Success", `Order marked as ${type === 'pay' ? 'Paid' : 'Delivered'}`,);
        } catch (err) {
            console.error("Update error", err);
            Alert.alert("Error", "Failed to update order status");
        }
    };

    const renderOrderItem = (order: any) => {
        const isExpanded = expandedOrderIds.includes(order.id);
        const items = JSON.parse(order.order_items);

        return (
            <View key={order.id} style={styles.orderCard}>
                <TouchableOpacity onPress={() => toggleExpand(order.id)} style={styles.orderSummary}>
                    <Text>Order ID: {order.id}</Text>
                    <Text>Items: {order.item_numbers}</Text>
                    <Text>Total: ${order.total_price / 100}</Text>
                    <Icon name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"} size={24} />
                </TouchableOpacity>

                {isExpanded && (
                    <View style={styles.expandedContent}>
                        {items.map((item: any, index: number) => (
                            <View key={index} style={styles.itemRow}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={{ width: 230 }}>
                                    <Text>{item.title}</Text>
                                    <Text>Quantity: {item.quantity}</Text>
                                </View>
                            </View>
                        ))}
                        {!order.is_paid && !order.is_delivered && (
                            <TouchableOpacity onPress={() => {
                                updateOrderStatus(order, 'pay');
                            }} style={styles.payButton}>
                                <Text style={styles.buttonText}>Pay</Text>
                            </TouchableOpacity>
                        )}
                        {order.is_paid && !order.is_delivered && (
                            <TouchableOpacity onPress={() => updateOrderStatus(order, 'deliver')} style={styles.receiveButton}>
                                <Text style={styles.buttonText}>Receive</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        );
    };

    const renderSection = (title: string, list: any[]) => (
        <View style={styles.section}>
            <Text style={styles.sectionHeader}>{title} Orders: {list.length}</Text>
            {list.map(renderOrderItem)}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>My Orders</Text>
                {renderSection("New", orders.new)}
                {renderSection("Paid", orders.paid)}
                {renderSection("Delivered", orders.delivered)}
            </ScrollView>
        </SafeAreaView>
    );
};

export { OrderScreen };