/**
 * Formats the user object to remove sensitive data before sending it in the response.
 * This implements the Data Minimization principle and DRY.
 *
 * @param {Object} user - The user object (Mongoose document or plain object).
 * @returns {Object|null} - The sanitized user object ready for response, or null.
 */
export const userResponse = (user) => {
  if (!user) return null;

  // Ensure we are working with a plain object (if it's a Mongoose document)
  const userObj = user.toObject ? user.toObject() : user;

  return {
    id: userObj._id,
    name: userObj.name,
    email: userObj.email,
    address: userObj.address,
    isAdmin: userObj.isAdmin,
    isBlocked: userObj.isBlocked,
    // Explicitly excluding: password, __v, resetPasswordToken, etc.
  };
};

/**
 * Formats the food object for API responses.
 *
 * @param {Object} food - The food object (Mongoose document or plain object).
 * @returns {Object|null} - The sanitized food object, or null.
 */
export const foodResponse = (food) => {
  if (!food) return null;
  const foodObj = food.toObject ? food.toObject() : food;
  return {
    id: foodObj._id,
    name: foodObj.name,
    price: foodObj.price,
    tags: foodObj.tags,
    favorite: foodObj.favorite,
    stars: foodObj.stars,
    imageUrl: foodObj.imageUrl,
    origins: foodObj.origins,
    cookTime: foodObj.cookTime,
  };
};

/**
 * Formats the cart object for API responses.
 *
 * @param {Object} cart - The cart object (Mongoose document or plain object).
 * @returns {Object|null} - The sanitized cart object, or null.
 */
export const cartResponse = (cart) => {
  if (!cart) return null;

  const cartObj = cart.toObject ? cart.toObject() : cart;

  return {
    _id: cartObj._id,
    items: cartObj.items.map((item) => ({
      food: foodResponse(item.food), // Nested formatting
      quantity: item.quantity,
      price: item.price,
    })),
    totalPrice: cartObj.totalPrice,
    totalCount: cartObj.totalCount,
  };
};

/**
 * Formats the order object to remove sensitive data.
 *
 * @param {Object} order - The order object (Mongoose document or plain object).
 * @returns {Object|null} - The sanitized order object, or null.
 */
export const orderResponse = (order) => {
  if (!order) return null;

  const orderObj = order.toObject ? order.toObject() : order;

  return {
    id: orderObj._id,
    items: orderObj.items.map((item) => ({
      food: foodResponse(item.food), // Nested formatting
      price: item.price,
      quantity: item.quantity,
    })),
    totalPrice: orderObj.totalPrice,
    status: orderObj.status,
    createdAt: orderObj.createdAt,
  };
};
