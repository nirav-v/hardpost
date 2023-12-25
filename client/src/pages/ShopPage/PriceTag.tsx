import { formatPrice } from "../../util/formatPrice";
import { HStack, Text, useColorModeValue as mode } from "@chakra-ui/react";

type PriceTagProps = {
  price: number;
  currency: string;
  salePrice?: number;
  rootProps?: any;
  priceProps?: any;
  salePriceProps?: any;
};

type PriceProps = {
  isOnSale: boolean;
  children: React.ReactNode;
  textProps?: any;
};

export const PriceTag = (props: PriceTagProps) => {
  const { price, currency, salePrice, rootProps, priceProps, salePriceProps } =
    props;
  return (
    <HStack spacing="1" {...rootProps}>
      <Price isOnSale={!!salePrice} textProps={priceProps}>
        {formatPrice(price, {
          currency,
        })}
      </Price>
      {salePrice && (
        <SalePrice {...salePriceProps}>
          {formatPrice(salePrice, {
            currency,
          })}
        </SalePrice>
      )}
    </HStack>
  );
};
const Price = (props: PriceProps) => {
  const { isOnSale, children, textProps } = props;
  const defaultColor = mode("gray.700", "gray.400");
  const onSaleColor = mode("gray.400", "gray.700");
  const color = isOnSale ? onSaleColor : defaultColor;
  return (
    <Text
      as="span"
      fontWeight="medium"
      color={color}
      textDecoration={isOnSale ? "line-through" : "none"}
      {...textProps}>
      {children}
    </Text>
  );
};
const SalePrice = (props: PriceTagProps) => (
  <Text
    as="span"
    fontWeight="semibold"
    color={mode("gray.800", "gray.100")}
    {...props}
  />
);
