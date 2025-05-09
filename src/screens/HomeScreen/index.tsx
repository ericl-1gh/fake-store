import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReduxState } from '@types';
import { performGetRequest, performGetRequestServer } from '@actions';
import { endpoints } from '@services';
import { styles } from './style';
import { Loader } from '@components';
import { setCartItems } from 'store/actions/cartActions';
import { setOrderItems } from 'store/actions/orderActions';

type Props = {};

const HomeScreen = (props: Props) => {
  const colors = useTheme().colors;
  const navigation = useNavigation();
  const ass = useSelector((state: IRootReduxState) => state.userDetails);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = useSelector(state => state.userDetails.profileDetails?.token);

  const dispatch = useDispatch();


  const fetchCategories = async () => {
    setLoading(true);
    let catArrFunc = performGetRequest(endpoints.categories);
    let catArr = await catArrFunc();
    setCategories(catArr);
    setLoading(false);
  };

  const cartAdded = async () => {
    let cartItems = await performGetRequestServer(endpoints.cart, token)();
    dispatch(setCartItems(cartItems?.data?.items ?? []));
  };

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
    } catch (err) {
      console.log(err);

    }
  };

  useEffect(() => {
    fetchCategories();
    cartAdded();
    fetchOrders();
  }, []);

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('CategoryScreen', { category: item })}
      style={styles.catList}
    >
      <Text style={styles.catTxt}>{capitalizeFirstLetter(item)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Loader isDefaultLoader isLoading={loading} />
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Categories</Text>
      </View>

      <FlatList
        style={{ marginTop: 20 }}
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderCategory}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </SafeAreaView>
  );
};

export { HomeScreen };
