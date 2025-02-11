import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./db/connect.db.js";

dotenv.config();
const app = express();

connectDB()
.then(
  app.listen(process.env.PORT || 8080, () => {
    console.log(`MongoDb connection is on  : http://localhost:${process.env.PORT} `);
})
)
.catch(
  (error) => console.log("mongoDB connection failed", error)
);

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(`Server is running on ${process.env.PORT}`);
});
