import { Router } from "express";
import multer from "multer";
import { projectController } from "./controller/create.project.controller";
import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.get("/", (req, res) => {
  return res.json({ message: "API funcionando!" });
});

router.post("/project", upload.single('file'), projectController.create);
router.get("/listproject", projectController.list)
router.patch("/project", projectController.update)

export default router;
