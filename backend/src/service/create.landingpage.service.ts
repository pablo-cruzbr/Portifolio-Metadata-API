import prismaClient from "../prisma";
import cloudinary from "../config/cloudnary";

interface LandingImagePayload {
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
  images: string[];
  imgcapa_url: string | null;
  
}

interface UpdateLandingPageRequest {
  id: string;
  title?: string;
  headline?: string;
  subheadline?: string;
  technologies?: string;
  github_url?: string;
  live_demo_url?: string;
  imgcapa_url?: string | null;
  imgcapa_public_id?: string | null;

  images?: {
    id?: string;
    url: string;
    public_id: string;
  }[];
}



class LandingPageService {

  async create({
    title,
    headline,
    subheadline,
    technologies,
    github_url,
    live_demo_url,
    images,
    imgcapa_url
  }: CreateLandingPageRequest) {

    if (!title || !headline) {
      throw new Error("Título e Headline são obrigatórios.");
    }

    let coverUrl: string | null = null;
    let coverPublicId: string | null = null;
    const uploadedImages: LandingImagePayload[] = [];

    // Upload capa
    if (imgcapa_url) {
      const result = await cloudinary.uploader.upload(imgcapa_url, {
        folder: "landingpage_covers"
      });

      coverUrl = result.secure_url;
      coverPublicId = result.public_id;
    }

    // Upload galeria
    if (images && images.length > 0) {
      const uploads = await Promise.all(
        images.map(img =>
          cloudinary.uploader.upload(img, {
            folder: "landingpage_gallery"
          })
        )
      );

      uploads.forEach(result => {
        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      });
    }

    return prismaClient.landingPage.create({
      data: {
        title,
        headline,
        subheadline,
        technologies,
        github_url,
        live_demo_url,
        imgcapa_url,
        imgcapa_public_id: coverPublicId,
        images: {
          create: uploadedImages
        }
      },
      include: { images: true }
    });
  }

  async update({ id, images, ...data }: UpdateLandingPageRequest) {
  const exists = await prismaClient.landingPage.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!exists) {
    throw new Error("Landing Page não encontrada.");
  }

  // 🔹 Atualiza apenas campos simples
  const landingPage = await prismaClient.landingPage.update({
    where: { id },
    data,
  });

  if (images && images.length > 0) {
    await prismaClient.projectImage.deleteMany({
      where: { landingpageId: id },
    });

    await prismaClient.projectImage.createMany({
      data: images.map((img) => ({
        url: img.url,
        public_id: img.public_id,
        landingpageId: id,
      })),
    });
  }

  return prismaClient.landingPage.findUnique({
    where: { id },
    include: { images: true },
  });
}


  async list() {
    return prismaClient.landingPage.findMany({
      orderBy: { created_at: "desc" },
      include: { images: true }
    });
  }

  async getById(id: string) {
    const landing = await prismaClient.landingPage.findUnique({
      where: { id },
      include: { images: true }
    });

    if (!landing) {
      throw new Error("Landing Page não encontrada.");
    }

    return landing;
  }

  async delete(id: string) {
    await prismaClient.projectImage.deleteMany({
      where: { landingpageId: id }
    });

    await prismaClient.landingPage.delete({
      where: { id }
    });

    return { message: "Landing Page deletada com sucesso!" };
  }
}

export { LandingPageService };
