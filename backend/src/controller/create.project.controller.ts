// Mude de: import { Request, Response } from "express";
// Para:
import type { Request, Response } from "express"; // <-- CORREÇÃO AQUI
import { CreateProjectService } from "../services/create.project.service.js";

class CreateProjectController {
    async handle(req: Request, res:Response){
        const createProjectService = new CreateProjectService();
        const { title, technologies, goal, features } = req.body;
        
        const data = { title, technologies, goal, features };
        
        const projeto = await createProjectService.execute(data); 

        return res.json(projeto)
    }
}

export {CreateProjectController}