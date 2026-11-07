import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", verifyToken, addToWishlist);
router.post("/remove", verifyToken, removeFromWishlist);
router.get("/", verifyToken, getWishlist);

export default router;
