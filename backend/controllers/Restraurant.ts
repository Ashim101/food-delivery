import { Request, Response } from "express";
import Restraurant from "../models/restraurantModel";

const searchRestraurant = async (req: Request, res: Response) => {
    try {
        const city = req.params.city;
        console.log("city", city);

        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedCuisines = (req.query.selectedCuisines as string) || "";
        const sortOption = (req.query.sortOption as string) || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

        

        const query: any = {};
        
        // Search by city (case-insensitive)
        if (city) {
            query["city"] = new RegExp(city, "i");
        }

        // Add selected cuisines to the query if provided
        if (selectedCuisines) {
            const cuisineArray = selectedCuisines.split(",").map((cuisine) => new RegExp(cuisine, "i"));
            query["cuisines"] = { $all: cuisineArray };
        }

        // Search query for restaurant name or cuisines
        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");
            query["$or"] = [
                { restaurantName: searchRegex },
                { cuisines: { $in: [searchRegex] } } // Search in cuisines
            ];
        }

        // Pagination settings
        const pageSize = 10;
        const skip = (page - 1) * pageSize;

        // Sort results by the sortOption field (e.g., lastUpdated)
        const restraurant = await Restraurant.find(query)
            .sort({ [sortOption]: 1 })
            .skip(skip)
            .limit(pageSize)
            .lean();
        
        const total = await Restraurant.countDocuments(query);

        // Prepare the response with pagination info
        const response = {
            data: restraurant,
            pagination: {
                page,
                total,
                totalPages: Math.ceil(total / pageSize)
            }
        };

        // Return response
        return res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


const getRestaurant=async(req:Request,res:Response)=>{

    const restaurantId=req.params.restaurantId
    console.log("inside get restaurant",restaurantId)
    try {
        const restaurant=await Restraurant.findOne({_id:restaurantId})
        if(!restaurant)
        {
            return res.status(404).json({message:"Restaurant not found"})
        }
        
        return res.json(restaurant)
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        
    }
}

export { searchRestraurant,getRestaurant };
