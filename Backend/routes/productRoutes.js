import express from "express";
import upload from "../middleware/upload.js";

import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/addProduct", upload.single("image"), addProduct);

router.get("/getProducts", getProducts);

router.get("/getProduct/:id", getProduct);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

export default router;