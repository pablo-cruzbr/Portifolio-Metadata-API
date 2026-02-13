import type { Request, Response } from "express";
import { FreelancerService } from "../service/create.freelancer.service";

const freelancerService = new FreelancerService();

class FreelancerController {

  async create(req: Request, res: Response) {
    console.log("BODY:", req.body);
console.log("FILES:", req.files);

    const { title, headline, subheadline, technologies, linkgithub, linklivedemo } = req.body;

    const capa =
      req.files && "imgcapa" in req.files
        ? (req.files.imgcapa as Express.Multer.File[])[0]
        : null;

    const galeria =
      req.files && "files" in req.files
        ? (req.files.files as Express.Multer.File[])
        : [];

    const images: string[] = galeria.map(
      file => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
    );

    const imgcapa_url = capa
      ? `data:${capa.mimetype};base64,${capa.buffer.toString("base64")}`
      : null;

    try {
      const landingPage = await freelancerService.create({
        title,
        headline,
        subheadline,
        technologies,
        github_url: linkgithub,
        live_demo_url: linklivedemo,
        images,
        imgcapa_url
      });

      return res.status(201).json(landingPage);

    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, headline, subheadline, technologies, linkgithub, linklivedemo } = req.body;

    const capa =
      req.files && "imgcapa" in req.files
        ? (req.files.imgcapa as Express.Multer.File[])[0]
        : null;

    const galeria =
      req.files && "files" in req.files
        ? (req.files.files as Express.Multer.File[])
        : [];

    let images;

    if (galeria.length > 0) {
      images = galeria.map(file => ({
        url: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        public_id: ""
      }));
    }

    const imgcapa_url = capa
      ? `data:${capa.mimetype};base64,${capa.buffer.toString("base64")}`
      : undefined;

    try {
      const landingPage = await freelancerService.update({
        id,
        title,
        headline,
        subheadline,
        technologies,
        github_url: linkgithub,
        live_demo_url: linklivedemo,
        imgcapa_url,
        images
      });

      return res.json(landingPage);

    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const landings = await freelancerService.list();
      return res.json(landings);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const landing = await freelancerService.getById(id);
      return res.json(landing);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const result = await freelancerService.delete(id);
      return res.json(result);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}

export const freelancerController = new FreelancerController();
