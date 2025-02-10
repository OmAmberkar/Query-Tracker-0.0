import express from "express";
import dotenv from "dot";  

dotenv.config();
const app = express();
const port = process.env.PORT ;

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(`Server is running on http://localhost:${port}`);
});
