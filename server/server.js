import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";
import connectDB from "./db/connect.db.js";
import userRoute from "./routes/registration.routes.js";
import userLogin from "./routes/login.routes.js";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }))

//controllers routers
app.use('/user',userRoute);
app.use('/user',userLogin);

//connect to database
connectDB()
.then(
  app.listen(process.env.PORT || 8080, () => {
    console.log(`MongoDb connection is on  : http://localhost:${process.env.PORT} `);
})
)
.catch(
  (error) => console.log("mongoDB connection failed", error)
);

//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(`Server is running on ${process.env.PORT}`);
});
