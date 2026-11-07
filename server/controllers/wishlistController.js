import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// ADD ITEM
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await userModel.findById(req.user.id);

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    // Return populated wishlist with full product details
    const populatedUser = await userModel.findById(req.user.id).populate("wishlist");

    res.json({
      success: true,
      message: "Added to wishlist",
      wishlist: populatedUser.wishlist,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Remove
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await userModel.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    // Return populated wishlist with full product details
    const populatedUser = await userModel.findById(req.user.id).populate("wishlist");

    res.json({
      success: true,
      message: "Removed from wishlist",
      wishlist: populatedUser.wishlist,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get Wish list 
export const getWishlist = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .populate("wishlist");

    res.json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
