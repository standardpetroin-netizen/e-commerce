import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        success: false,
        message: "Not Authorized. Please login again",
      });
    }

    // Extract token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token || token === "null" || token === "undefined") {
      return res.json({
        success: false,
        message: "Invalid token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.json({
        success: false,
        message: "Invalid token payload",
      });
    }

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export { verifyToken };
export default verifyToken;
