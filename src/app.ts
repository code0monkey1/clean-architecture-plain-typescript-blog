/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import logger from "./config/logger";
import { HttpError } from "http-errors";
const app = express();
import "express-async-errors";
import { expressRouteAdapter } from "./main/adapters/express-route-adapter";
import { makeSignUpController } from "./main/factories/controllers/authentication/sign-up/controller-factory";

declare module "express" {
    interface Request {
        userId?: string;
    }
}

app.get("/data", (req, res) => {
    res.json({ data: "working" });
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post("/register", expressRouteAdapter(makeSignUpController()));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        errors: [
            {
                type: error.message,
                path: "",
                location: "",
            },
        ],
    });
});

export default app;
