import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import axios from "axios";
import { MasonryFlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch } from "react-redux";

import { addToCart } from "../store/slice/cartSlice";
import { Product } from "../utils/types";
import ProductCard from "../components/ProductCard";

type RenderItemProps = {
  item: Product;
  i: number;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const url = `https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json`;
    axios
      .get(url)
      .then((res) => setProducts(res.data.data))
      .finally(() => setLoading(false));
  }, [setLoading, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProductToCart = useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const navigateToDetail = useCallback(
    (product: Product) => {
      navigation.navigate(`ProductDetail`, { data: product });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: RenderItemProps) => {
      return (
        <ProductCard
          product={item}
          onAdd={addProductToCart}
          goToDetail={navigateToDetail}
        />
      );
    },
    [addProductToCart, navigateToDetail]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `white` }}>
      {loading && <ActivityIndicator />}
      {!loading && products && (
        <MasonryFlashList
          estimatedItemSize={200}
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReachedThreshold={1.5}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
