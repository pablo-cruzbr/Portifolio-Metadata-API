import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from 'cors';
import path from 'path';
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(router);

app.use(((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    if (err instanceof Error) {
        res.status(400).json({
            error: err.message
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error.'
        });
    }
}) as import('express').ErrorRequestHandler);

app.listen(3334, () => {
    console.log('Servidor Metadata API Online na porta 3334!');
});