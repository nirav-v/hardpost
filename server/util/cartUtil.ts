import { Cart, Item, User } from '../models';

// util function for verifying the items from users local storage cart before adding them to cart in database
export const checkItemExists = (cartItem: Item, dbItems: Item[]) => {
  //  check this case: for each local cart item added, we also have to check if its id still exists in the database as the owner may have already deleted it
  for (const item of dbItems) {
    if (item.id === cartItem.id) return true;
  }
  return false;
};

// this function returns an array of all valid cart items
export const validateLocalCartItems = ({
  localCart,
  dbItems,
  loggedInUser,
}: {
  localCart: Item[];
  dbItems: Item[];
  loggedInUser: User;
}) => {
  const validCartItems = localCart.filter(
    cartItem =>
      checkItemExists(cartItem, dbItems) && cartItem.userId !== loggedInUser.id
  );

  return validCartItems;
};
