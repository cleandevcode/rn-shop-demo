import React, { useCallback, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
} from "react-native";
import { Chip, Text } from "react-native-paper";
import { Product } from "../utils/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";

const DetailScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<any>();

  const product = useMemo(() => {
    return route.params.data as Product | undefined;
  }, [route.params]);

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const addProductToCart = useCallback(() => {
    if (!product?.id) return;
    dispatch(addToCart(product));
  }, [dispatch, product]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={goBack}>
          <FeatherIcon name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={addProductToCart}>
          <Text>Add to cart</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, product, goBack, addProductToCart]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: `white`,
        padding: 20,
        paddingBottom: 50,
      }}
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <Image
          source={{ uri: product?.mainImage }}
          style={{ width: `100%`, height: 250, marginTop: 20 }}
          resizeMode="contain"
        />
        <Text variant="headlineLarge">{product?.name}</Text>
        <Text variant="bodyLarge">{product?.brandName}</Text>
        <Text variant="bodyMedium" style={{ color: `grey` }}>
          {product?.description}
        </Text>
        <View
          style={{
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
            marginTop: 20,
          }}
        >
          <Text variant="bodyLarge">
            {product?.price.currency} {product?.price.amount}
          </Text>
          <Chip icon="information">{product?.stockStatus}</Chip>
        </View>
        <Text variant="bodyLarge" style={{ marginTop: 20 }}>
          Size
        </Text>
        <View style={{ flexDirection: `row` }}>
          {product?.sizes.map((size) => (
            <View
              style={{
                alignItems: `center`,
                justifyContent: `center`,
                borderRadius: 40,
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: `green`,
                marginRight: 10,
                marginTop: 5,
              }}
            >
              <Text>{size}</Text>
            </View>
          ))}
        </View>
        <Text variant="bodyLarge" style={{ marginTop: 20 }}>
          Colour
        </Text>
        <View
          style={{
            alignItems: `center`,
            justifyContent: `center`,
            borderRadius: 40,
            width: 40,
            height: 40,
            borderWidth: 1,
            borderColor: `black`,
            marginTop: 5,
            backgroundColor: product?.colour,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
