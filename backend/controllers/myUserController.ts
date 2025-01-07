import { Request, Response } from "express";
import User from "../models/userModel"; // Ensure this path is correct

// Define the controller function
const createCurrentUser = async (req: Request, res: Response) => {
    try {
        const { auth0Id } = req.body;

        // Validate auth0Id
        if (!auth0Id) {
            return res.status(400).json({ message: "auth0Id is required" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) {
            return res.status(200).json({
                message: "User already exists",
                user: existingUser.toObject(),
            });
        }

        // Create new user
        const newUser = new User(req.body);
        await newUser.save();

        // Send created user response
        return res.status(201).json({
            message: "User created successfully",
            user: newUser.toObject(),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating the user" });
    }
};

export { createCurrentUser };
