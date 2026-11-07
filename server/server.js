import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB, { dbState } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import orderRouter from "./routes/orderRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import wishlistRouter from "./routes/wishlistRoutes.js"

// app config
dotenv.config()
connectDB()

//app
const app = express()

const DEFAULT_ORIGINS = [
  "https://thepetroshop.com",
  "https://www.thepetroshop.com",
  "https://e-commerce-tau-ruby-53.vercel.app",
  "http://localhost:5173",
]

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((o) => o.trim()).filter(Boolean)
  : DEFAULT_ORIGINS

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // allow same-origin / server-to-server requests (no Origin header)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error(`Not allowed by CORS: ${origin}`))
  },
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Health check - Render pings this, and it makes a dead database obvious
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "e-commerce-api",
    database: dbState(),
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  })
})

//API Endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)
app.use("/api/cart", cartRouter)
app.use("/api/wishlist", wishlistRouter)


app.get("/", (req, res) => {
  res.send("API working")
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
