import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { IRootReduxState } from '@types';
import { performGetRequest } from '@actions';
import { endpoints } from '@services';
import { styles } from './style';
import { Loader } from '@components';

type Props = {};

const HomeScreen = (props: Props) => {
  const colors = useTheme().colors;
  const navigation = useNavigation();
  const ass = useSelector((state: IRootReduxState) => state.userDetails);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading , setLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    setLoading(true);
    let catArrFunc = performGetRequest(endpoints.categories);
    let catArr = await catArrFunc();
    setCategories(catArr);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
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
      <Loader isDefaultLoader isLoading={loading}/>
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
