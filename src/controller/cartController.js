import {
  getActiveUserById,
  getActiveUserByIdAndUpdate,
} from "../services/userService.js";

export const addToCart = async (req, res, next) => {
  try {
    const { foodId, quantity = 1 } = req.body;
    const userId = req.user.id;
    const user = await getActiveUserById(userId);
    const cartData = user.cartData || {};

    if (cartData[foodId]) {
      cartData[foodId] += quantity;
    } else {
      cartData[foodId] = quantity;
    }

    await getActiveUserByIdAndUpdate(userId, { cartData });

    res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      data: cartData,
    });
  } catch (error) {
    next(error);
  }
};

export const getCartItems = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getActiveUserById(userId);
    res.status(200).json({
      success: true,
      data: user.cartData,
      message: "feach cart successfully.",
    });
  } catch (error) {
    next(error);
  }
};
export const removeFromCart = async (req, res, next) => {
  try {
    const { foodId } = req.params;
    const user = await getActiveUserById(req.user.id);

    if (!user.cartData || !user.cartData[foodId]) {
      const error = new Error("Item not found in cart");
      error.statusCode = 404;
      throw error;
    }

    let cartData = user.cartData;
    if (cartData[foodId] > 1) {
      cartData[foodId] -= 1;
    } else {
      delete cartData[foodId];
    }

    await getActiveUserByIdAndUpdate(req.user.id, { cartData });
    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      data: { cartData, foodId },
    });
  } catch (error) {
    next(error);
  }
};
