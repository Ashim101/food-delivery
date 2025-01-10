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
