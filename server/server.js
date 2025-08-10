import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./db/connect.db.js";
import userRoute from "./routes/registration.routes.js";
import userLogin from "./routes/login.routes.js";
import ticketRoutes from './routes/ticket.routes.js';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// CORS configuration
app.use(cors({ 
  credentials: true,
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173'
}));

//middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

//controllers routers
app.use('/user',userRoute);
app.use('/user',userLogin);
app.use('/user',ticketRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: "Something went wrong", 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//connect to database
connectDB()
.then(
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port: ${process.env.PORT || 8080}`);
    console.log(`Health check: http://localhost:${process.env.PORT || 8080}/health`);
})
)
.catch(
  (error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
);
