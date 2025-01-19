import { Request, Response } from "express";
import Restraurant from "../models/restraurantModel";
import cloudinary from "cloudinary"
import mongoose from "mongoose";


const getMyRestraurant = async (req: Request, res: Response) => {
    try {
        const restraurant = await Restraurant.findOne({ user: req.userId })

        if (!restraurant) {
            return res.status(404).json({ message: "Restraurant Not Found" })
        }

        res.json(restraurant)

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })


    }
}

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


const updateMyRestraurant = async (req: Request, res: Response) => {

    try {




        const restraurant = await Restraurant.findOne({ user: req.userId });
        if (!restraurant) {
            return res.status(404).json({ message: "Restraurant not found" })
        }

        if (req.file) {
            const image = req.file as Express.Multer.File
            const base64Image = Buffer.from(image.buffer).toString("base64")
            const dataUri = `data:${image.mimetype};base64,${base64Image}`;
            const uploadResponse = await cloudinary.v2.uploader.upload(dataUri)
            restraurant.imageUrl = uploadResponse.url;



        }


        restraurant.restaurantName = req.body.restraurantName;
        restraurant.city = req.body.city;
        restraurant.country = req.body.country;
        restraurant.cuisines = req.body.cuisines;
        restraurant.menuItems = req.body.menuItems;
        restraurant.lastUpdated = new Date();
        await restraurant.save()
        return res.status(201).send(restraurant)


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}






export { createMyRestraurant, getMyRestraurant, updateMyRestraurant };