import Cart from "../models/cartModel.js";

// 🛒 Get Cart for a User
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
    if (!cart) {
      return res.json({ success: true, cart: { products: [] } });
    }
    res.json({ success: true, cart });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// 🛒 Add Product to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // Create new cart if doesn't exist
      cart = new Cart({
        userId: req.user.id,
        products: [{ productId, quantity }],
      });
    } else {
      // Check if product already exists
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        // Update quantity if exists
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Added to cart", cart });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// 🛒 Update Quantity of a Product
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.json({ success: false, message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return res.json({ success: true, message: "Cart updated", cart });
    } else {
      return res.json({ success: false, message: "Product not found in cart" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// 🛒 Remove Product from Cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.json({ success: false, message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();
    res.json({ success: true, message: "Product removed", cart });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
