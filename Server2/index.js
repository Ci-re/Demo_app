require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const authRouter = require("./router/auth");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  console.log("Hit!!!!");
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log("app is listening on port ", PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
