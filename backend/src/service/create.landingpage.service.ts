import prismaClient from "../prisma";
import cloudinary from "../config/cloudnary";

interface LandingPageImagePayload {
    url: string;
    public_id: string;
}

interface CreateLandingPageRequest {
    title: string;
    headline: string;
    subheadline?: string;
    technologies?: string;
    github_url?: string;
    live_demo_url?: string;
    images: string[]; // Base64 ou caminhos
}

interface UpdateLandingPageRequest {
    id: string;
    title?: string;
    headline?: string;
    subheadline?: string;
    technologies?: string;
    github_url?: string;
    live_demo_url?: string;
    images?: string[];
}

class LandingPageService {
    async createLP({ 
        title, headline, subheadline, technologies, 
        github_url, live_demo_url, images 
    }: CreateLandingPageRequest) {

        if (!title || !headline) {
            throw new Error("Título e Headline são obrigatórios.");
        }

        const uploadedImagePayloads: LandingPageImagePayload[] = [];

        // Upload das imagens para o Cloudinary (Pasta específica para LPs)
        if (images && images.length > 0) {
            try {
                const uploadPromises = images.map(img =>
                    cloudinary.uploader.upload(img, {
                        folder: "portfolio_lp_gallery"
                    })
                );

                const results = await Promise.all(uploadPromises);

                results.forEach(result => {
                    uploadedImagePayloads.push({
                        url: result.secure_url,
                        public_id: result.public_id,
                    });
                });
            } catch (error) {
                console.error("Erro no upload Cloudinary:", error);
                throw new Error("Falha ao processar imagens da Landing Page.");
            }
        }

        const landingPage = await prismaClient.landingPage.create({
            data: {
                title,
                headline,
                subheadline,
                technologies,
                github_url,
                live_demo_url,
                images: {
                    create: uploadedImagePayloads,
                }
            },
            include: { images: true }
        });

        return landingPage;
    }

    async listLPs() {
        return await prismaClient.landingPage.findMany({
            orderBy: { created_at: "desc" },
            include: { images: true }
        });
    }

    async getLPById(id: string) {
        const lp = await prismaClient.landingPage.findUnique({
            where: { id },
            include: { images: true }
        });

        if (!lp) throw new Error("Landing Page não encontrada.");
        return lp;
    }

   async updateLP({ id, images, ...rest }: UpdateLandingPageRequest) {
    const existing = await prismaClient.landingPage.findUnique({ 
        where: { id },
        include: { images: true } 
    });

    if (!existing) throw new Error("Landing Page não encontrada.");

    const updateData: any = { ...rest };

    if (images && images.length > 0) {
        try {
            const uploadPromises = images.map(img =>
                cloudinary.uploader.upload(img, {
                    folder: "portfolio_lp_gallery"
                })
            );

            const results = await Promise.all(uploadPromises);

            updateData.images = {
                deleteMany: {}, 
                create: results.map(result => ({
                    url: result.secure_url,
                    public_id: result.public_id,
                }))
            };
        } catch (error) {
            console.error("Erro no upload das novas imagens:", error);
            throw new Error("Falha ao atualizar imagens.");
        }
    }

    return await prismaClient.landingPage.update({
        where: { id },
        data: updateData,
        include: { images: true }
    });
}
    async deleteLP(id: string) {
        await prismaClient.landingPage.delete({
            where: { id }
        });
        return { message: "Landing Page removida com sucesso!" };
    }
}

export { LandingPageService };