import express from "express";
import router from "./routes";
import "express-async-errors";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 3333;

app.listen(PORT, () => console.log(`🔥 Servidor online na porta ${PORT}`));
