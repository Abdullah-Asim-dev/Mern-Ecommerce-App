import mongoose from "mongoose";
import productSchema from "../schema/productSchema.js";

const productModel = mongoose.model("Product", productSchema);

export default productModel;