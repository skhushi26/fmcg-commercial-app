import { Request, Response } from "express";
import Product from "../models/product";
import responseBuilder from "../utils/responseBuilder";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, category, price } = req.body;

    const product = new Product({
      name,
      category,
      price,
    });

    await product.save();
    responseBuilder(res, null, product, "Product created successfully", 201);
  } catch (error) {
    responseBuilder(res, error, null, "Failed to create product", 500);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, price } = req.body;

  try {
    const product = await Product.findById(id);

    if (product) {
      product.name = name || product.name;
      product.category = category || product.category;
      product.price = price || product.price;

      const updatedProduct = await product.save();
      responseBuilder(res, null, updatedProduct, "Product updated successfully", 200);
    } else {
      responseBuilder(res, null, null, "Product not found", 404);
    }
  } catch (error) {
    responseBuilder(res, error, null, "Failed to update product", 500);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Product.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      responseBuilder(res, null, null, "Product removed successfully", 200);
    } else {
      responseBuilder(res, null, null, "Product not found", 404);
    }
  } catch (error) {
    responseBuilder(res, error, null, "Failed to delete product", 500);
  }
};

const getProducts = async (req: Request, res: Response) => {
  const { category, price, name, page = 1, limit = 10 } = req.query;

  const query: any = {};
  if (category) query.category = category;
  if (price) query.price = { $lte: price };
  if (name) query.name = { $regex: name, $options: "i" };

  try {
    const products = await Product.find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    responseBuilder(res, null, products, "Products retrieved successfully", 200);
  } catch (error) {
    responseBuilder(res, error, null, "Failed to retrieve products", 500);
  }
};

export { createProduct, updateProduct, deleteProduct, getProducts };
