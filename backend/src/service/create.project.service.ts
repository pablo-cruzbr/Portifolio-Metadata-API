import prismaClient from "../prisma";

interface CreateProjectRequest {
    title: string;
    technologies: string;
    goal: string;
    features: string;
    linkgihub?: string;
    linklivedemo?: string;
    images: string[];
    imgcapa_url: string | null;
}

interface UpdateProjectRequest {
    id: string;
    title?: string;
    technologies?: string;
    goal?: string;
    features?: string;
    images?: string[];
    imgcapa_url: string | null; 
    linkgihub?: string;
    linklivedemo?: string;
}

class ProjectService {

    async createProject({ title, technologies, goal, features, images, imgcapa_url, linkgihub, linklivedemo }: CreateProjectRequest) {

        if (!title || !technologies || !goal || !features) {
            throw new Error("Todos os campos obrigatórios devem ser fornecidos.");
        }

        const project = await prismaClient.project.create({
            data: {
                title,
                technologies,
                goal,
                features,
                imgcapa_url,
                linkgihub,
                linklivedemo,
                images: {
                    create: images.map(img => ({
                        url: img
                    }))
                }
            },
            include: { images: true }
        });

        return project;
    }

    async updateProject({ id, title, technologies, goal, features, images, imgcapa_url, linkgihub, linklivedemo }: UpdateProjectRequest) {

        const updatedProject = await prismaClient.project.update({
            where: { id },
            data: {
                title,
                technologies,
                goal,
                features,
                imgcapa_url,
                linkgihub,
                linklivedemo,
                ...(images && {
                    images: {
                        create: images.map(img => ({
                            url: img
                        }))
                    }
                })
            },
            include: { images: true }
        });

        return updatedProject;
    }

    async getProjectById(id: string) {
        const project = await prismaClient.project.findUnique({
            where: { id },
            include: { images: true }
        });

        if (!project) {
            throw new Error("Projeto não encontrado");
        }

        return project;
    }

    async listProjects() {
        return await prismaClient.project.findMany({
            orderBy: { created_at: "desc" },
            include: { images: true }
        });
    }

    async deleteProject(id: string) {

         await prismaClient.projectImage.deleteMany({
        where: { projectId: id }
    });
    
        await prismaClient.project.delete({
            where: { id }
        });
        return { message: "Projeto deletado com sucesso!" };
    }
}

export { ProjectService };
