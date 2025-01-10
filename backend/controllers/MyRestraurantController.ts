import { Request, Response } from "express";
import Restraurant from "../models/restraurantModel";
import cloudinary from "cloudinary"
import mongoose from "mongoose";

const createMyRestraurant = async (req: Request, res: Response) => {

    try {

        const existingRestraurant = await Restraurant.findOne({ user: req.userId })
        if (existingRestraurant) {
            return res.status(409).json({ message: "User restraurant already exists" })
        }

        const image = req.file as Express.Multer.File
        const base64Image = Buffer.from(image.buffer).toString("base64")
        const dataUri = `data:${image.mimetype};base64,${base64Image}`;
        const uploadResponse = await cloudinary.v2.uploader.upload(dataUri)
        const restraurant = new Restraurant(req.body);
        restraurant.imageUrl = uploadResponse.url;
        restraurant.user = new mongoose.Types.ObjectId(req.userId)
        restraurant.lastUpdated = new Date();
        await restraurant.save()
        return res.status(201).send(restraurant)


    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}
export { createMyRestraurant };