import mongoose from "mongoose"

// Keep the API process alive even when MongoDB is temporarily unreachable.
// Render kills and restarts a crashed service in a loop (503 to visitors), which
// hides the real error - so we log it, keep serving /health, and retry in the
// background with backoff instead of calling process.exit().
const RETRY_DELAY_MS = 5000
const MAX_DELAY_MS = 60000

const connectDB = async (attempt = 1) => {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not set - database features are disabled")
    return
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 15000,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    const delay = Math.min(RETRY_DELAY_MS * attempt, MAX_DELAY_MS)
    console.error(`MongoDB connection failed (attempt ${attempt}): ${error.message}`)
    console.error(`Retrying in ${Math.round(delay / 1000)}s`)
    setTimeout(() => connectDB(attempt + 1), delay)
  }
}

export const dbState = () => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"]
  return states[mongoose.connection.readyState] || "unknown"
}

export default connectDB
