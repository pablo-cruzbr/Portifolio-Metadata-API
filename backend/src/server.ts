import express from "express";
import router from "./routes";
import "express-async-errors";
import cors from "cors";
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 3333;
app.use('/files', 
    express.static(path.resolve(__dirname, '..', 'tmp')));
app.listen(PORT, () => console.log(`🔥 Servidor online na porta ${PORT}`));
