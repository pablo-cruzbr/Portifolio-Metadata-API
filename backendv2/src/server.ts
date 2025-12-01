// server.ts
import express from "express";
import type { Request, Response, NextFunction } from "express";

import {router} from "./routes.js";

// ✨ CORREÇÃO: Inicialize o Express e atribua à variável 'app'
const app = express(); 
// Opcionalmente, você pode tipar: const app: express.Express = express();

app.use(express.json());

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