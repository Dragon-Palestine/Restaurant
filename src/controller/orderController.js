import {
  getActiveUserByIdAndUpdate,
  getActiveUserById,
} from "../services/userService.js";
import {
  createOrder,
  getOrderByIdAndUpdate,
  getOrderById,
  feachAllOrders,
  deleteOrderById,
  getOrdersByUserId
} from "../services/orderService.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res, next) => {
  if (!process.env.FRONTEND_PORT) {
    const error = new Error(".env 'FRONTEND_PORT' is empty");
    error.statusCode = 404;
    return next(error);
  }
  const frontend_url = `http://localhost:${process.env.FRONTEND_PORT}`;
  let orderId;
  try {
    const orderData = {
      userId: req.user.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    };
    const newOrder = await createOrder(orderData);
    orderId = newOrder._id;

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    // clear cart after placing order
    await getActiveUserByIdAndUpdate(req.user.id, { cartData: {} });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    if (orderId) {
      await deleteOrderById(orderId);
    }
    next(error);
  }
};

export const verifyOrder = async (req, res, next) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await getOrderByIdAndUpdate(orderId, {
        payment: true,
        status: "confirmed",
      });
      res.json({ success: true, message: "Paid" });
    } else {
      await getOrderByIdAndUpdate(orderId, { status: "cancelled" });
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await getOrdersByUserId(req.user.id);
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await feachAllOrders();
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    await getOrderByIdAndUpdate(req.params.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await deleteOrderById(req.params.orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, message: "Order Deleted" });
  } catch (error) {
    next(error);
  }
};

export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
