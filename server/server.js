import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
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

// Middleware
app.use(cors({origin: ["https://e-commerce-tau-ruby-53.vercel.app", "http://localhost:5173"], 
    credentials: true}))
app.use(express.json())
app.use(cookieParser())

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
