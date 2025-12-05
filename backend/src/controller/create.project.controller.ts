import type { Request, Response } from "express";
import { ProjectService } from "../service/create.project.service";

const projectService = new ProjectService();

class ProjectController {
    constructor() {
    }

    async create(req: Request, res: Response) {
        const { title, technologies, goal, features } = req.body;
        
        const image_url = req.file ? req.file.filename : undefined; 

        try {
            const project = await projectService.createProject({
                title,
                technologies,
                goal,
                features,
                image_url, 
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
        const { title, technologies, goal, features } = req.body;

        const image_url = req.file ? req.file.filename : undefined; 
        try {
            const project = await projectService.updateProject({
                id: id as string,
                image_url, 
                title,
                technologies,
                goal,
                features
            });

            return res.json(project);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
    
    async list(req: Request, res: Response) {
        const { id, title, technologies, goal, features } = req.query;

        try {
            const projects = await projectService.listProjects({
                id: id as string,
                title: title as string,
                technologies: technologies as string,
                goal: goal as string,
                features: features as string
            });

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