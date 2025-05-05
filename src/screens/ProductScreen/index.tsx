import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text, Card, Title, Paragraph } from 'react-native-paper';
import { styles } from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '@resources';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductScreen = () => {

    const route = useRoute();

    const navigation = useNavigation();

    const { product } = route.params;

    return (
        <SafeAreaView edges={["top"]}>
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Product Details</Text>

            <Image source={{ uri: product.image }} style={styles.productImage} />

            <Text style={styles.title}>{product.title}</Text>

            <View style={styles.infoRow}>
                <Text style={styles.infoText}>Rate: {product.rating.rate}</Text>
                <Text style={styles.infoText}>Count: {product.rating.count}</Text>
                <Text style={styles.infoText}>Price: ${product.price.toFixed(2)}</Text>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.goBack()}>
                    <Icon
                        name={'arrow-back-outline'}
                        size={20}
                        color={Colors.offWhite}
                    />
                    <Text
                        style={{ alignSelf: 'center', paddingVertical: 10, marginLeft: 10, color: Colors.offWhite }}

                    >
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Icon
                        name={'cart'}
                        size={20}
                        color={Colors.offWhite}
                    />
                    <Text
                        style={{ alignSelf: 'center', paddingVertical: 10, marginLeft: 10, color: Colors.offWhite }}
                    >
                        Add to Cart
                    </Text>
                </TouchableOpacity>
            </View>

            <Card style={styles.card}>
                <Card.Content>
                    <Title>Description:</Title>
                    <Paragraph>{product.description}</Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>
        </SafeAreaView>
    );
};



export default ProductScreen;
