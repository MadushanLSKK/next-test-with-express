import express from "express";
import { getAllProducts, createProduct , getProductById , updateProduct , deleteProduct } from "../controller/productController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";
const router = express.Router();

router.get("/",  getAllProducts);
router.post("/", verifyToken, checkRole("admin"), createProduct);
router.get("/:id",getProductById);
router.put("/:id", verifyToken, checkRole("admin"), updateProduct);
router.delete("/:id", verifyToken, checkRole("admin"), deleteProduct);

export default router;