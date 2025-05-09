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

  const apiCallError = (response) => {
    if (response.message === "Wrong token.") {
      Alert.alert(response.message , "", [{
        text: "Cancel",
        style: 'cancel'
      }, {
        text: "Log in",
        onPress: () => {
          navigation.navigate("LoginScreen")
        }
      }])
    }
    // Handle error response from server if needed
    console.error("Failed to add to cart:", cartAdded.message || "Unknown error");
  }

  const handleAddToCart = async () => {
    // Find if the product already exists in the cart
    const existingCartItem = cartItems.find(item => item.id === product.id);

    // If the product exists in the cart, update the quantity, otherwise add it as a new product
    const updatedCartItems = existingCartItem
      ? cartItems.map(item =>
        item.id === product.id
          ? { ...item, count: item.count + 1 } // Increment the count of the existing product
          : item
      )
      : [...cartItems, { ...product, count: 1 }]; // Add new product with count 1

    // Construct the request body with updated cart items
    const requestBody = { items: updatedCartItems };  // Send full product objects

    try {
      // Make the request to update the cart on the server
      const cartAdded = await performPutRequestServer(endpoints.cart, requestBody, token)();

      // If the response is successful, update the Redux state
      if (cartAdded.status === "OK") {
        // Dispatch the updated cart item with the correct count
        const updatedItem = updatedCartItems.find(item => item.id === product.id);
        dispatch(addToCart(updatedItem, 1)); // Dispatch with correct count
      } else {
        apiCallError(cartAdded);
      }
    } catch (error) {
      console.error("Error in adding to cart:", error);
    }
  };

  const handleIncrement = async () => {
    const updatedCartItems = cartItems.map(item =>
      item.id === product.id
        ? { ...item, count: item.count + 1 }
        : item
    );

    const requestBody = { items: updatedCartItems };

    try {
      const cartAdded = await performPutRequestServer(endpoints.cart, requestBody, token)();
      if (cartAdded.status === "OK") {
        dispatch(incrementQuantity(product.id));
      } else {
        apiCallError(cartAdded);
      }
    } catch (error) {
      console.error("Error incrementing item:", error);
    }
  };


  const handleDecrement = async () => {
    const updatedCartItems = cartItems
      .map(item =>
        item.id === product.id
          ? { ...item, count: item.count - 1 }
          : item
      )
      .filter(item => item.count > 0); // remove items with 0 count

    const requestBody = { items: updatedCartItems };

    try {
      const cartAdded = await performPutRequestServer(endpoints.cart, requestBody, token)();
      if (cartAdded.status === "OK") {
        dispatch(decrementQuantity(product.id));
      } else {
        apiCallError(cartAdded);
      }
    } catch (error) {
      console.error("Error decrementing item:", error);
    }
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
              <Text style={styles.buttonText}>{cartItem.count}</Text>
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
