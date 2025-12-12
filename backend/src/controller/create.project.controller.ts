import type { Request, Response } from "express";
import { ProjectService } from "../service/create.project.service";

const projectService = new ProjectService();

class ProjectController {

    async create(req: Request, res: Response) {
        const { title, technologies, goal, features, linkgihub, linklivedemo } = req.body;

        const capa = req.files && "imgcapa" in req.files
            ? (req.files.imgcapa as Express.Multer.File[])[0]
            : null;

        const galeria = req.files && "files" in req.files
            ? (req.files.files as Express.Multer.File[])
            : [];

        const images = galeria.map(file => file.filename);
        const imgcapa_url = capa ? capa.filename : null;

        try {
            const project = await projectService.createProject({
                title,
                technologies,
                goal,
                features,
                images,
                imgcapa_url,
                linkgihub,
                linklivedemo
            });

            return res.status(201).json(project);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const project = await projectService.getProjectById(id);
            return res.json(project);
        } catch (err: any) {
            return res.status(404).json({ error: err.message });
        }
    }

  async update(req: Request, res: Response) {
  const { id } = req.params;
  const { title, technologies, goal, features, linkgihub, linklivedemo } = req.body;

  const filesData = req.files as {
      imgcapa?: Express.Multer.File[];
      files?: Express.Multer.File[];
  };

  const imgcapa_url = filesData?.imgcapa?.[0]?.filename || null;

  const images = filesData?.files
      ? filesData.files.map(file => file.filename)
      : [];

  try {
      const project = await projectService.updateProject({
          id,
          title,
          technologies,
          goal,
          features,
          images,
          imgcapa_url,
          linkgihub,
          linklivedemo
      });

      return res.json(project);

  } catch (err: any) {
      return res.status(400).json({ error: err.message });
  }
}

    async list(req: Request, res: Response) {
        try {
            const projects = await projectService.listProjects();
            return res.json(projects);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID é obrigatório!" });
        }

        try {
            const msg = await projectService.deleteProject(id);
            return res.json(msg);
        } catch (err: any) {
            return res.status(404).json({ error: "Projeto não encontrado para deleção." });
        }
    }
}

export const projectController = new ProjectController();
