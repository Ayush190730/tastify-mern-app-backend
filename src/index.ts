import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import restaurantRoute from "./routes/RestaurantRoute"
import { v2 as cloudinary } from "cloudinary";
import Restaurant from './models/restaurant';

mongoose
.connect(process.env.MONGO_URI as string)
.then(()=> console.log("MongoDB Connected Successfully 🤩"))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app  = express();

// Middlewares 
app.use(express.json());  // automatically converts the body of any request to json
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
          res.send({ message: "health OK!" });
        });

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);

app.listen(4000, ()=>{
          console.log('Server has started at 4000 🚀');
})