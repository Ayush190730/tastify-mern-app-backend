import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config";
import myUserRoute from "./routes/MyUserRoute";

mongoose
.connect(process.env.MONGO_URI as string)
.then(()=> console.log("MongoDB Connected Successfully 🤩"))

const app  = express();

// Middlewares 
app.use(express.json());  // automatically converts the body of any request to json
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
          res.send({ message: "health OK!" });
        });

app.use("/api/my/user", myUserRoute);

app.listen(4000, ()=>{
          console.log('Server has started at 4000 🚀');
})