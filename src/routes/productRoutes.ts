import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController";
import { protect, admin } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

export default router;
