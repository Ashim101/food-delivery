import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "../routes/myUserRoute";
import { jwtCheck } from "../middlewares/auth";
import { v2 as cloudinary } from 'cloudinary'
import myRestraurantRoutes from "../routes/myRestraurantRoute";
import restraurantRoutes from "../routes/RestraurantRoute";
import orderRoutes from "../routes/orderRoutes";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => { console.log("database connected") })
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const app = express()
app.use(express.json())
app.use(cors())

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "Health ok!" })
})

app.get("/test", async (req: Request, res: Response) => {
    res.json({ msg: "Welcome to the app" })
});

app.use("/api/my/user", jwtCheck, userRoutes)
app.use("/api/my/restraurant", myRestraurantRoutes)
app.use("/api/restraurant",restraurantRoutes)
app.use("/api/order", orderRoutes);


app.listen(7000, () => {
    console.log("listening on the port 7000")
});
