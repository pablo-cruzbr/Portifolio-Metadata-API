import prismaClient from "../prisma";
import cloudinary from "../config/cloudnary"; 

interface ProjectImagePayload {
    url: string;
    public_id: string; 
}

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

const IDS_PRIORITARIOS: string[] = [
    "22465f01-246b-4199-a8f8-7ba87b40a017",
    "8751d66f-4e44-48cc-b497-15e84c49797d",
]

class ProjectService {
    async createProject({ title, technologies, goal, features, images, imgcapa_url, linkgihub, linklivedemo }: CreateProjectRequest) {

        if (!title || !technologies || !goal || !features) {
            throw new Error("Todos os campos obrigatórios devem ser fornecidos.");
        }

        let uploadedCoverUrl: string | null = null;
        let coverPublicId: string | null = null;
        const uploadedImagePayloads: ProjectImagePayload[] = [];

        if (imgcapa_url) {
            try {
                const result = await cloudinary.uploader.upload(imgcapa_url, { 
                    folder: "portfolio_project_covers" 
                });
                uploadedCoverUrl = result.secure_url;
                coverPublicId = result.public_id; 

                // CONSOLE.LOG PARA IMAGEM DE CAPA
            console.log(`[Cloudinary] Imagem de Capa enviada em: ${result.created_at}`);
            } catch (error) {
                console.error("Erro no upload da Imagem de Capa:", error);
                throw new Error("Falha ao processar a imagem de capa.");
            }
        }

        if (images && images.length > 0) {
            const uploadPromises = images.map(imgBase64OrPath =>
                cloudinary.uploader.upload(imgBase64OrPath, { 
                    folder: "portfolio_project_gallery" 
                })
            );

            try {
                const results = await Promise.all(uploadPromises);

                results.forEach(result => {
                    uploadedImagePayloads.push({
                        url: result.secure_url,
                        public_id: result.public_id, 
                    });

                    // CONSOLE.LOG PARA CADA IMAGEM DA GALERIA
                console.log(`[Cloudinary] Imagem da Galeria enviada em: ${result.created_at} - URL: ${result.secure_url}`);
                });

            } catch (error) {
                console.error("Erro no upload das imagens da galeria:", error);
                throw new Error("Falha ao processar uma ou mais imagens da galeria.");
            }
        }

        const project = await prismaClient.project.create({
            data: {
                title,
                technologies,
                goal,
                features,
                linkgihub,
                linklivedemo,
                imgcapa_url: uploadedCoverUrl,
                images: {
                    create: uploadedImagePayloads, 
                }
            },
            include: { images: true }
        });

        return project;
    }

    async updateProject({
        id,
        title,
        technologies,
        goal,
        features,
        images,
        imgcapa_url,
        linkgihub,
        linklivedemo
    }: UpdateProjectRequest) {

        const existing = await prismaClient.project.findUnique({
            where: { id },
            include: { images: true }
        });

        if (!existing) {
            throw new Error("Projeto não encontrado");
        }

        const updatedProject = await prismaClient.project.update({
            where: { id },
            data: {
                title,
                technologies,
                goal,
                features,
                linkgihub,
                linklivedemo,
                imgcapa_url: imgcapa_url || existing.imgcapa_url,

                ...(images && images.length > 0 && {
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

        const prioritizedProjects = await prismaClient.project.findMany({
            where: {
                id: {
                    in: IDS_PRIORITARIOS,
                },
            },
            orderBy: { created_at: "desc" },
            include: { images: true }
        });

        const remainingProjects = await prismaClient.project.findMany({
            where: {
                id: {
                    notIn: IDS_PRIORITARIOS,
                },
            },
            orderBy: { created_at: "desc" },
            include: { images: true }
        });

        return [...prioritizedProjects, ...remainingProjects];
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