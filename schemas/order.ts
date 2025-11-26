import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [
    {
      productId: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
    default: "pending",
  },
  paymentMethod: { type: String, enum: ["card", "cash"], required: true },
}, { timestamps: true });



export default mongoose.models.User || mongoose.model('Order', OrderSchema);