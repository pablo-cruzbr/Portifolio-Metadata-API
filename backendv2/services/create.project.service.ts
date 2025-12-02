import prismaClient from "../prisma copy/index.js";

interface ProjectRequest{
    id?: string;
    title: string;
    technologies: string;
    goal: string;
    features: string;
}

interface UpdateProjectRequest{
    id: string;
    title: string;
    technologies: string;
    goal: string;
    features: string;
}
class ProjectService{
    async createProject({
        title,
        technologies,
        goal,
        features
    }: ProjectRequest){
        if(!title){
            throw new Error("É necessário um nome ao projeto !");
        }

        const project = await prismaClient.project.create({
            data: {
                title,
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
        features
    }:UpdateProjectRequest){
        const project = await prismaClient.project.update({
            where: {id},
            data: {
                title,
                technologies,
                goal,
                features
            },
        });
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