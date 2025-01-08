import { auth } from "express-oauth2-jwt-bearer";
import "dotenv/config";

export const jwtCheck = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUERBASEURL,
    tokenSigningAlg: 'RS256'
});
