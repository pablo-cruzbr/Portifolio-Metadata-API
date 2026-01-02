import { Router } from "express";
import multer from "multer";
import { projectController } from "./controller/create.project.controller";
import { landingPageController } from "./controller/create.landingpage.controller";

import uploadConfig from "./config/multer";

const router = Router();
//const upload = multer(uploadConfig.upload("./tmp"));
const upload = multer(uploadConfig.upload());
router.get("/", (req, res) => {
  return res.json({ message: "API funcionando!" });
});

router.post(
  "/project",
  upload.fields([
    { name: "imgcapa", maxCount: 1 },
    { name: "files", maxCount: 10 }
  ]),
  projectController.create
);
router.get("/listproject", projectController.list)
router.get("/listproject/:id", projectController.getById)
router.patch("/project/:id", upload.fields([{ name: "imgcapa", maxCount: 1 }, { name: "files", maxCount: 10 }]), projectController.update);
router.delete("/delete/project/:id", projectController.delete)


// Rotas de Landing Page

router.post(
  "/landingpages",
  upload.fields([
     { name: "imgcapa", maxCount: 1 },
    { name: "files", maxCount: 10 }
  ]),
  landingPageController.create
);

router.patch(
  "/landingpages/:id",
  upload.fields([
    { name: "imgcapa", maxCount: 1 },
    { name: "files", maxCount: 10 }
  ]),
  landingPageController.update
);

// LIST
router.get(
  "/landingpages",
  landingPageController.list
);

// GET BY ID
router.get(
  "/landingpages/:id",
  landingPageController.getById
);

// DELETE
router.delete(
  "/landingpages/:id",
  landingPageController.delete
);

export default router;
