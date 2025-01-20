import mongoose, { InferSchemaType } from "mongoose";

const menuItemSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  });
  
  export type MenuItemType = InferSchemaType<typeof menuItemSchema>;


const restraurantSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    city: {
        type: String,
        required: true
    },
    deliveryPrice: {
        type: Number,
        required: true
    },
    estimatedDeliveryTime: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    cuisines:
        [{ type: String, required: true }],
    menuItems: [{ type: menuItemSchema, required: true }],
    imageUrl: { type: String, required: true },
    lastUpdated: {
        type: Date,
        required: true
    }


})

const Restraurant = mongoose.model("Restraurant", restraurantSchema)

export default Restraurant;

