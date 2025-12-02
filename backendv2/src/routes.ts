// routes.ts
import {Router} from "express"
import { projectController } from "../controller/create.project.controller.js";

// 💡 Crie a instância do Router
const router = Router();

router.get('/',(req, res) => {
    res.json({message: "API Metada Backendv2 Online!"})
});

router.post("/projects", projectController.create);
router.put("/projects/:id", projectController.update);
router.get("/projects", projectController.list);
router.delete("/projects/:id", projectController.delete);


// Exporte a instância
export {router}