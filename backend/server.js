import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/mongodb.js";

import userRouter from "./routes/authRoutes.js";
import expenseRouter from "./routes/expenseRoutes.js";

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api", expenseRouter);

app.get("/health", (req, res) => {
  res.send("API Working");
});

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});
