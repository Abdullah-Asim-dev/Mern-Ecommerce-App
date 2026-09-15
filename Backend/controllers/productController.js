import productModel from "../model/productModel.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const {
      name,
      price,
      currencyCode,
      numberOfSales,
      rating,
      freeShipping,
      shopName,
    } = req.body;

    const image = req.file?.path;

    if (
      !name ||
      !price ||
      !currencyCode ||
      !shopName ||
      numberOfSales === undefined ||
      rating === undefined ||
      freeShipping === undefined ||
      !image
    ) {
      return res.send({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const productData = await productModel.create({
      name,
      price,
      currencyCode,
      numberOfSales,
      rating,
      freeShipping,
      shopName,
      image,
    });

    res.send({
      message: "Product added successfully",
      success: true,
      result: productData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "Failed to add product",
      success: false,
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    console.log("Products fetched successfully");

    res.send({
      success: true,
      result: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// Get Single Product
export const getProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (product) {
      res.send({
        success: true,
        result: product,
      });
    } else {
      res.send({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const updateData = {
      ...req.body,
    };

    // If a new image is uploaded, save its Cloudinary URL
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    console.log(updatedProduct);

    if (updatedProduct) {
      res.send({
        message: "Data Updated",
        success: true,
        result: updatedProduct,
      });
    } else {
      res.send({
        success: false,
        message: "Failed to update data",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Failed to update product",
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteProductData = await productModel.findByIdAndDelete(id);

    console.log(deleteProductData);

    if (deleteProductData) {
      res.send({
        message: "Data Deleted",
        success: true,
        result: deleteProductData,
      });
    } else {
      res.send({
        success: false,
        message: "Failed to delete data",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Failed to delete product",
    });
  }
};