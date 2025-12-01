// routes.ts
import {Router} from "express"

// 💡 Crie a instância do Router
const router = Router();

router.get('/',(req, res) => {
    res.json({message: "API Metada Backendv2 Online!"})
});

// Exporte a instância
export {router}