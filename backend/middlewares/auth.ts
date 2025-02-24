import { auth } from "express-oauth2-jwt-bearer";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

declare global {
    namespace Express {
        interface Request {
            auth0Id: string;
            userId: string;

        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        res.sendStatus(401)
    }
    const token = authorization?.split(" ")[1]

    try {
        const decode = jwt.decode(token as string) as jwt.JwtPayload
        const auth0Id = decode.sub
        const user = await User.findOne({ auth0Id });
        if (!user) {
            return res.sendStatus(401)
        }
        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();
        next();
    } catch (error) {
        res.sendStatus(401)

    }

}
