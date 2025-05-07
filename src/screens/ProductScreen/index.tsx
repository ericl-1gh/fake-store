import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './style';
import { Colors } from '@resources';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../../store/actions/cartActions';
import { performPostRequestServer, performPutRequestServer } from '@actions';
import { endpoints } from '@services';

const ProductScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const token = useSelector(state => state.userDetails.profileDetails?.token);
  const dispatch = useDispatch();
  const { product } = route.params;

  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);

  console.log("cartItem", cartItem);


  const handleAddToCart = async () => {

    const requestBody = {
      items: [
        {
          id: product.id,
          price: product.price,
          count: cartItem?.quantity + 1 || 1,
        },
      ],
    };
    console.log("requestBodyrequestBody",requestBody);
    
    try {
      const cartAdded = await performPutRequestServer(endpoints.cart, requestBody, token)();
      dispatch(addToCart(product, 1));
    } catch (error) {
      console.error('Error in adding to cart:', error);
    }
  };

  const handleIncrement = async () => {
    const requestBody = {
      items: [
        {
          id: product.id,
          price: product.price,
          count: 1,
        },
      ],
    };
    const cartAdded = await performPutRequestServer(endpoints.cart, requestBody, token)();
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = async () => {
    const requestBody = {
      items: [
        {
          id: product.id,
          price: product.price,
          count: 1,
        },
      ],
    };
    const cartAdded = await performPutRequestServer(endpoints.cart, requestBody, token)();    
    dispatch(decrementQuantity(product.id));
  };

  return (
    <SafeAreaView>
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={20} color={Colors.offWhite} />
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          {cartItem ? (
            <View style={[styles.button, styles.quantityContainer]}>
              <TouchableOpacity onPress={handleDecrement}>
                <Icon name="remove-circle-outline" size={24} color={Colors.offWhite} />
              </TouchableOpacity>
              <Text style={styles.buttonText}>{cartItem.quantity}</Text>
              <TouchableOpacity onPress={handleIncrement}>
                <Icon name="add-circle-outline" size={24} color={Colors.offWhite} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleAddToCart} style={styles.button}>
              <Icon name="cart" size={20} color={Colors.offWhite} />
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
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
