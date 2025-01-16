import { Request, Response } from "express"
import Restraurant from "../models/restraurantModel"
const searchRestraurant = async (req: Request, res: Response) => {

    try {

        const city = req.params.city


        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedCuisines = (req.query.selectedCuisines as string) || ""
        const sortOption = (req.query.sortOption as string) || "lastUpdated"
        const page = parseInt(req.query.page as string) || 1;

        const query: any = {};
        query["city"] = new RegExp(city, "i");

        const restraurantCount = await Restraurant.countDocuments(query)

        if (restraurantCount === 0) {
            return res.status(404).json([])

        }

        if (selectedCuisines) {
            const cuisineArray = selectedCuisines.split(",").map((cuisine) => { new RegExp(cuisine, "i") })
            query["cuisines"] = { $all: cuisineArray };

        }

        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i")

            query["$or"] = [
                { restraurantName: searchRegex },
                { cuisines: { $in: searchRegex } }
            ];
        }

        const pageSize = 10
        const skip = (page - 1) * pageSize

        query["sortOption"] = new RegExp(sortOption, "i")
        const restraurant = await Restraurant.find(query).sort({ [sortOption]: 1 }).skip(skip).limit(pageSize).lean()
        const total = await Restraurant.countDocuments(query)
        const response = {
            data: restraurant,
            pagination: {
                page,
                total,
                totalPages: Math.ceil(total / pageSize)
            }
        }

        return res.json(response)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }

}

export { searchRestraurant }