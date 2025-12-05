import prismaClient from "../prisma";

interface ProjectRequest{
    id?: string;
    title: string;
    image_url?: string | null;
    technologies: string;
    goal: string;
    features: string;
}

interface UpdateProjectRequest{
    id: string;
    title?: string; 
    image_url?: string | null; 
    technologies?: string; 
    goal?: string; 
    features?: string; 
}

class ProjectService{
    async createProject({
        title,
        technologies,
        goal,
        image_url,
        features
    }: ProjectRequest){
        
        if (!title || !technologies || !goal || !features) {
             throw new Error("Todos os campos obrigatórios (title, technologies, goal, features) devem ser fornecidos.");
        }
        
        const project = await prismaClient.project.create({
            data: {
                title,
                image_url: image_url || null, 
                technologies,
                goal,
                features
            },
        });
        return project
    }

    async updateProject ({
        id,
        title,
        technologies,
        goal,
        features,
        image_url
    }:UpdateProjectRequest){
        const dataToUpdate = {
            title,
            technologies,
            goal,
            features,
            image_url: image_url === undefined ? undefined : image_url || null 
        };
        
        const filteredData = Object.fromEntries(
            Object.entries(dataToUpdate).filter(([_, value]) => value !== undefined)
        );

        const project = await prismaClient.project.update({
            where: {id},
            data: filteredData, 
        });
        return project;
    }

    async getProjectById(id: string) {
    const project = await prismaClient.project.findUnique({
        where: { id },
    });

    if (!project) {
        throw new Error("Projeto não encontrado");
    }

    return project;
}


    async listProjects({ id, title, technologies, goal, features }: ProjectRequest) {
    const projects = await prismaClient.project.findMany({
        where: {
            ...(id && { id }),
            ...(title && { title: { contains: title, mode: "insensitive" } }),
            ...(technologies && { technologies: { contains: technologies, mode: "insensitive" } }),
            ...(goal && { goal: { contains: goal, mode: "insensitive" } }),
            ...(features && { features: { contains: features, mode: "insensitive" } }),
        },
        orderBy: {
            created_at: "desc"
        }
    });
    return projects;
    }

    async deleteProject (id: string){
        await prismaClient.project.delete({
            where: {id},
        });
        return {message: "Projeto deletado com sucesso !!"}
    }
}

export {ProjectService}