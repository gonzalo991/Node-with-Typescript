import type { Response, Request, NextFunction } from "express";
import {
    NotFoundException, UpdateException,
    ValidationException
} from "../error/app.exception.js";

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
    if (error instanceof NotFoundException) {
        res.status(404).json({ message: error.message });
        return;
    }

    if (error instanceof ValidationException) {
        res.status(400).json({ message: error.message });
    }

    if (error instanceof UpdateException) {
        res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal Server Error" });
}