import {
  getActiveUserById,
  getActiveUserByIdAndUpdate,
} from "./userService.js";

/**
 * Fetches the cart data for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} The user's cart data.
 */
export const getCartData = async (userId) => {
  const user = await getActiveUserById(userId);
  if (!user) {
    // This case should ideally be caught by auth middleware, but it's good practice to check.
    throw new Error("User not found");
  }
  return user.cartData || {};
};

/**
 * Adds an item to the user's cart or increments its quantity.
 * @param {string} userId - The ID of the user.
 * @param {string} itemId - The ID of the food item to add.
 * @returns {Promise<Object>} The updated cart data.
 */
export const addItemToCart = async (userId, itemId) => {
  const user = await getActiveUserById(userId);
  const cartData = { ...(user.cartData || {}) };

  cartData[itemId] = (cartData[itemId] || 0) + 1;

  await getActiveUserByIdAndUpdate(userId, { cartData });
  return cartData;
};

/**
 * Removes an item from the user's cart or decrements its quantity.
 * @param {string} userId - The ID of the user.
 * @param {string} itemId - The ID of the food item to remove.
 * @returns {Promise<Object>} The updated cart data.
 */
export const removeItemFromCart = async (userId, itemId) => {
  const user = await getActiveUserById(userId);
  const cartData = { ...(user.cartData || {}) };

  if (cartData[itemId] && cartData[itemId] > 0) {
    cartData[itemId] -= 1;
    if (cartData[itemId] === 0) {
      delete cartData[itemId];
    }
  }

  await getActiveUserByIdAndUpdate(userId, { cartData });
  return cartData;
};
