'use server';

import { connect, disconnect } from "@/lib/db";
import order from "@/schemas/order";

export const createOrder = async (orderData: any) => {
  try {
    // Here you would typically save the orderData to your database
    console.log('Order created:', orderData);
    await connect()
    const newOrder = new order(orderData);
    await newOrder.save();
    await disconnect()
    console.log(newOrder)
    return { success: true, message: 'Order created successfully', order: JSON.parse(JSON.stringify(newOrder)) };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, message: 'Failed to create order', error };
  }
}