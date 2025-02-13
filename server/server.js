import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";
import connectDB from "./db/connect.db.js";
import userRoute from "./routes/registration.routes.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }))

//controllers
app.use('/user',userRoute);

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
