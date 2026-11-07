import express from "express";
import {
  placeOrder,
  userOrders,
  allOrders,
  listOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// User routes
orderRouter.post("/place", verifyToken, placeOrder);
orderRouter.get("/user-orders", verifyToken, userOrders);

// Admin routes
orderRouter.get("/all-orders", adminAuth, allOrders);
orderRouter.get("/list", adminAuth, listOrders);  // New: Admin can list all orders
orderRouter.put("/update", adminAuth, updateOrderStatus);  // New: Admin can update order status

export default orderRouter;
