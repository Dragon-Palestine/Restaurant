import {
  getCartData,
  addItemToCart,
  removeItemFromCart,
} from "../services/cartService.js";

export const getCartItems = async (req, res, next) => {
  try {
    const cartData = await getCartData(req.user.id);
    res.json({ success: true, cartData });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    await addItemToCart(req.user.id, req.body.itemId);
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    await removeItemFromCart(req.user.id, req.body.itemId);
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    next(error);
  }
};
