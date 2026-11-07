import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const adminAuth = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }

    // 2️⃣ Check cookie if header not present
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default adminAuth;