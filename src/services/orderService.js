import Order from "../models/orderModel.js";
export const createOrder = async (orderData) => {
    try {
        const order = await Order.create(orderData);
        return order;
    } catch (error) {
        throw error;
    
    }

}

export const getOrderByIdAndUpdate = async (id, updateData) => {
    try {
        const order = await Order.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
        return order;
    } catch (error) {
        throw error;
    }
}

export const getOrderById = async (id) => {
    try {
        const order = await Order.findById(id);
        return order;
    } catch (error) {
        throw error;
    }
}

export const getOrdersByUserId = async (userId) => {
    try {
        const orders = await Order.find({ userId });
        return orders;
    } catch (error) {
        throw error;
    }

}

export const feachAllOrders = async () => {
    try {
        const orders = await Order.find({});
        return orders;
    } catch (error) {
        throw error;
    }
}

export const deleteOrderById = async (id) => {
    try {
        const order = await Order.findByIdAndDelete(id);
        return order;
    } catch (error) {
        throw error;
    }
}