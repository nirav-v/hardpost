import { Item, User } from '../models/index.js';

export const fulfillOrder = async (userEmail: string) => {
  try {
    const loggedInUser = await User.findOne({ where: { email: userEmail } });

    if (!loggedInUser)
      throw new Error(`cannot find a user with this email ${userEmail}`);

    const userCart = await loggedInUser.getCart();
    const cartItems = await userCart.getItems();
    const order = await loggedInUser.createOrder();
    // pass in the updated array of cart items with an updated orderItem property that specifies the item quantity
    await order.addItems(cartItems);
    await userCart.setItems([]); //clear user's cart after order is placed
    // mark all items from the cart as sold
    for (let item of cartItems) {
      Item.update({ sold: true }, { where: { id: item.id } });
    }
  } catch (error) {
    console.log(error);
  }
};
