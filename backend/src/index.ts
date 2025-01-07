import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "../routes/myUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => { console.log("database connected") })

const app = express()
app.use(express.json())
app.use(cors())

app.get("/test", async (req: Request, res: Response) => {
    res.json({ msg: "Welcome to the app" })
});

app.use("/api/my/user", userRoutes)

app.listen(7000, () => {
    console.log("listening on the port 7000")
});
