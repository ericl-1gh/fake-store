import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { performGetRequest } from '@actions';
import { endpoints } from '@services';
import { styles } from './style';
import { Loader } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '@resources';


export interface ProductsType {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

const CategoryScreen = () => {
  const colors = useTheme().colors;
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params as { category: string };

  const [products, setProducts] = useState<ProductsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const fetchCategories = async () => {
    setLoading(true);
    let catArrFunc = performGetRequest(endpoints.categorywiseproduct + category);
    let catArr = await catArrFunc();
    setProducts(catArr);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderProduct = ({ item }: { item: ProductsType }) => (
    <TouchableOpacity
      style={styles.productList}
      onPress={() => navigation.navigate('ProductScreen', { product: item })}
    >
      <View style={styles.imgview}>
        <Image source={{ uri: item.image }} style={styles.productImg} />
      </View>
      <View style={styles.namepriceview}>
        <Text style={styles.catTxt}>{capitalizeFirstLetter(item.title)}</Text>
        <Text style={styles.priceTxt}>
          <Text style={styles.catTxt}>Price: </Text>${item.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Loader isLoading={loading} isDefaultLoader />
      <View style={styles.cattitleview}>
        <Text style={styles.cattitle}>{capitalizeFirstLetter(category)}</Text>
      </View>

      <FlatList
        style={{ marginTop: 20 }}
        data={products}
        contentContainerStyle={{ alignItems: 'center' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
      />

      <TouchableOpacity style={styles.button}
      onPress={() => navigation.goBack()}>
        <Icon
          name={'arrow-back-outline'}
          size={20}
          color={Colors.offWhite}
        />
        <Text
          style={{alignSelf:'center', paddingVertical:10,marginLeft: 10, color:Colors.offWhite}}
          
        >
          Back
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export { CategoryScreen };
