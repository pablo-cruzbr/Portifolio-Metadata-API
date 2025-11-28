
import { Router } from "express";
import { projectController } from "./controller/create.project.controller.js";

const router = Router(); 

router.get('/', (req, res) => {
    res.json({ message: "API Metadata Service is running!" });
});

router.post("/projects", projectController.create);
router.put("/projects/:id", projectController.update);
router.get("/projects", projectController.list);
router.delete("/projects/:id", projectController.delete);

export { router };