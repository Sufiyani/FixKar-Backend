import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./lib/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: function (origin, callback) {
    // Allow no-origin requests (mobile, curl, Postman)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, '');
    const cleanFrontend = (process.env.FRONTEND_URL || '').replace(/\/$/, '');

    const allowed =
      cleanOrigin === cleanFrontend ||
      cleanOrigin.endsWith('.vercel.app') ||
      cleanOrigin === 'http://localhost:5173' ||
      cleanOrigin === 'http://localhost:3000';

    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));



// Routes
app.get("/", (req, res) => {
  res.send("FixKar system running🚀");
});

app.use("/api/admin", adminRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV})`)
);

export default app;