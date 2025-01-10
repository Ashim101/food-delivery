import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors:", errors);
        console.log("errorarray:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateMyUserRequest = [
    // Ensure the value is a string and not purely numeric
    body("name")
        .isString().withMessage("Name must be a string")
        .not().isNumeric().withMessage("Name cannot be a number"),
    body("addressLine1")
        .isString().withMessage("AddressLine1 must be a string")
        .not().isNumeric().withMessage("AddressLine1 cannot be a number"),
    body("country")
        .isString().withMessage("Country must be a string")
        .not().isNumeric().withMessage("Country cannot be a number"),
    body("city")
        .isString().withMessage("City must be a string")
        .not().isNumeric().withMessage("City cannot be a number"),
    handleValidationErrors,
];

export const validateMyRestaurantRequest = [
    // Validate restaurant name
    body("restraurantName")
        .isString().withMessage("Restaurant name must be a string")
        .not().isNumeric().withMessage("Restaurant name cannot be a number"),

    // Validate city
    body("city")
        .isString().withMessage("City must be a string")
        .not().isNumeric().withMessage("City cannot be a number"),

    // Validate country
    body("country")
        .isString().withMessage("Country must be a string")
        .not().isNumeric().withMessage("Country cannot be a number"),

    // Validate delivery price (should be a positive number)
    body("delieveryPrice")
        .isFloat({ min: 0 }).withMessage("Delivery price must be a positive number"),

    // Validate estimated delivery time (should be a positive number)
    body("estimatedDelieveryTime")
        .isInt({ min: 1 }).withMessage("Estimated delivery time must be a positive integer"),



    // Validate cuisines (array of strings)
    body("cuisines")
        .isArray().not().notEmpty().withMessage("Cuisines must be an non empty array"),



    // Validate menuItems (array of objects, each with name and price)
    body("menuItems")
        .isArray().withMessage("MenuItems must be an array"),

    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({ min: 0 }).withMessage("Menu item price should be positive value"),


    handleValidationErrors,
];