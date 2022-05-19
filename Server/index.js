require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";

const morgan = require("morgan");

const app = express();

// db connection
const DBConnect = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB CONNECTION ERROR: ", err));
};

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await DBConnect(process.env.DATABASE);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
  } catch (error) {}
};

start();
