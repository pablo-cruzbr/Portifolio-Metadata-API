import { Router } from "express";
import { projectController } from "./controller/create.project.controller";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ message: "API funcionando!" });
});

router.post("/project", projectController.create)
router.get("/listproject", projectController.list)
router.patch("/project", projectController.update)

export default router;
