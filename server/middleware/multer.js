import multer from "multer";
import path from "path";

// Use memory storage to avoid file system issues
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload; 