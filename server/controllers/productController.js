import cloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js";
import { Readable } from "stream";

// ===============================
// ADD PRODUCT
// ===============================
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // ✅ Validate required fields
    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // 📸 Get uploaded images
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    if (!image1) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const images = [image1, image2, image3, image4].filter(Boolean);

    // ===============================
    // UPLOAD IMAGES TO CLOUDINARY
    // ===============================
    const imagesURL = await Promise.all(
      images.map(async (file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );

          const stream = Readable.from(file.buffer);
          stream.pipe(uploadStream);
        });
      })
    );

    // ===============================
    // PARSE SIZES
    // ===============================
    let parsedSizes = [];

    if (sizes) {
      if (typeof sizes === "string") {
        parsedSizes = sizes.split(",").map((s) => s.trim());
      } else if (Array.isArray(sizes)) {
        parsedSizes = sizes;
      }
    }

    // ===============================
    // CREATE PRODUCT
    // ===============================
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" || bestseller === true,
      sizes: parsedSizes,
      image: imagesURL,
      date: Date.now(),
    };

    const product = await productModel.create(productData);

    res.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add product",
    });
  }
};



// ===============================
// LIST PRODUCTS
// ===============================
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ===============================
// REMOVE PRODUCT
// ===============================
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    await productModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ===============================
// SINGLE PRODUCT
// ===============================
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
