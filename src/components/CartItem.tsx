import React, { useCallback } from "react";
import { Alert, View } from "react-native";
import { Cart } from "../utils/types";
import { Image } from "react-native";
import {
  Divider,
  IconButton,
  MD3Colors,
  Text,
  Dialog,
  Button,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../store/slice/cartSlice";

type ItemProps = {
  cart: Cart;
};

const CartItem: React.FC<ItemProps> = ({ cart }) => {
  const dispatch = useDispatch();

  const handleIncrease = useCallback(() => {
    dispatch(incrementQuantity(cart.id));
  }, [cart, dispatch]);

  const handleDecrease = useCallback(() => {
    if (cart.quantity > 1) dispatch(decrementQuantity(cart.id));
    else
      Alert.alert(
        `Are you sure?`,
        `Do you want to remove this product from cart?`,
        [
          {
            text: `No`,
            onPress: () => {},
            style: `cancel`,
          },
          {
            text: `Yes`,
            onPress: () => dispatch(removeItem(cart.id)),
            style: `default`,
          },
        ],
        {
          cancelable: true,
        }
      );
  }, [cart, dispatch]);

  return (
    <>
      <View style={{ flexDirection: `row` }}>
        <View style={{ width: `30%` }}>
          <Image
            source={{ uri: cart.mainImage }}
            style={{ width: `100%`, height: 150, padding: 10 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{ width: `70%`, padding: 20, justifyContent: `space-between` }}
        >
          <View>
            <Text variant="bodyMedium" style={{ fontWeight: `bold` }}>
              {cart.name}
            </Text>
            <Text variant="bodySmall" style={{ color: `gray` }}>
              Colour: {cart.colour} | SKU: #{cart.SKU}
            </Text>
            <Text variant="bodySmall" style={{ color: `gray` }}>
              Size: {cart.sizes.join(", ")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: `row`,
              alignItems: `center`,
              justifyContent: `space-between`,
            }}
          >
            <Text>
              {cart.price.currency} {cart.price.amount}
            </Text>
            <View
              style={{
                flexDirection: `row`,
                alignItems: `center`,
                backgroundColor: MD3Colors.secondary90,
                borderRadius: 20,
                height: 40,
              }}
            >
              <IconButton icon="plus" size={20} onPress={handleIncrease} />
              <Text style={{ fontWeight: `bold` }}>{cart.quantity}</Text>
              <IconButton icon="minus" size={20} onPress={handleDecrease} />
            </View>
          </View>
        </View>
      </View>
      <Divider />
    </>
  );
};

export default CartItem;
