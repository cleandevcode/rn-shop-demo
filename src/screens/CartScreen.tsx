import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Cart } from "../utils/types";
import CartItem from "../components/CartItem";
import { Divider, Text } from "react-native-paper";

type RenderItemProps = {
  item: Cart;
  i: number;
};

const CartHeader: React.FC<{ cart: Cart[] }> = ({ cart }) => {
  return (
    <>
      <View
        style={{
          flexDirection: `row`,
          alignItems: `center`,
          justifyContent: `space-between`,
          marginBottom: 5,
        }}
      >
        <Text variant="bodyMedium">{`${cart.length} ${
          cart.length > 1 ? "items" : "item"
        }`}</Text>
      </View>
      <Divider style={{ height: 2 }} />
    </>
  );
};

const CartScreen: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.cart);

  const renderItem = ({ item }: RenderItemProps) => {
    return <CartItem cart={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `white` }}>
      <FlatList
        data={cart}
        contentContainerStyle={{ padding: 10 }}
        renderItem={renderItem}
        ListHeaderComponent={<CartHeader cart={cart} />}
      />
    </SafeAreaView>
  );
};

export default CartScreen;
