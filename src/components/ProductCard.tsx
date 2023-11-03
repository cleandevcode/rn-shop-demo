import React from "react";
import { Product } from "../utils/types";
import { Button, Card, Text } from "react-native-paper";

type CardType = {
  product: Product;
  onAdd: (_product: Product) => void;
  goToDetail: (_product: Product) => void;
};

const ProductCard: React.FC<CardType> = ({ product, onAdd, goToDetail }) => {
  return (
    <Card
      style={{
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: `white`,
      }}
      onPress={() => goToDetail(product)}
    >
      <Card.Content>
        <Text variant="bodyMedium">{product.name}</Text>
        <Text variant="bodyMedium" style={{ fontWeight: `bold` }}>
          {product.price.currency} {product.price.amount}
        </Text>
      </Card.Content>
      <Card.Cover
        source={{ uri: product.mainImage }}
        resizeMode="contain"
        style={{ marginTop: 5, padding: 5, backgroundColor: `white` }}
      />
      <Card.Actions>
        <Button mode="text" onPress={() => onAdd(product)}>
          Add to Cart
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ProductCard;
