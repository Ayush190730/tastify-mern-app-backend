import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import restaurantRoute from "./routes/RestaurantRoute"
import { v2 as cloudinary } from "cloudinary";
import orderRoute from "./routes/OrderRoute";

mongoose
.connect(process.env.MONGO_URI as string)
.then(()=> console.log("MongoDB Connected Successfully 🤩"))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app  = express();

// app.use(cors());

const cors = require('cors');

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

// Middlewares 
app.use(express.json());  // automatically converts the body of any request to json


app.get("/health", async (req: Request, res: Response) => {
          res.send({ message: "health OK!" });
        });

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute)


app.listen(4000, ()=>{
          console.log('Server has started at 4000 🚀');
})



// {
//   ...
//   "paymentMethod": {
//       "type": "scheme",
//       "encryptedCardNumber": "test_5555555555554444",
//       "encryptedExpiryMonth": "test_03",
//       "encryptedExpiryYear": "test_2030",
//       "encryptedSecurityCode": "test_737"
//     }
//   }