import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  currencyCode: {
    type: String,
    required: true,
  },

  numberOfSales: {
    type: Number,
    default: 0,
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
  },

  freeShipping: {
    type: String,
    enum: ["Yes", "No"],
    default: "Yes",
  },

  shopName: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

export default productSchema;