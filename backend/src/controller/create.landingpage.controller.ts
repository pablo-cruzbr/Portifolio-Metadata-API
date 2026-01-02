import { Request, Response } from 'express';
import { LandingPageService } from '../service/create.landingpage.service';

class LandingPageController {
  
  // Criar nova Landing Page
  async handleCreate(req: Request, res: Response) {
    const { title, headline, subheadline, technologies, github_url, live_demo_url, images } = req.body;

    const landingPageService = new LandingPageService();

    try {
      const lp = await landingPageService.createLP({
        title,
        headline,
        subheadline,
        technologies,
        github_url,
        live_demo_url,
        images
      });

      return res.status(201).json(lp);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async handleList(req: Request, res: Response) {
    const landingPageService = new LandingPageService();

    try {
      const lps = await landingPageService.listLPs();
      return res.json(lps);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async handleGetById(req: Request, res: Response) {
    const { id } = req.params;
    const landingPageService = new LandingPageService();

    try {
      const lp = await landingPageService.getLPById(id);
      return res.json(lp);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async handleUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const { title, headline, subheadline, technologies, github_url, live_demo_url, images } = req.body;

    const landingPageService = new LandingPageService();

    try {
      const updatedLp = await landingPageService.updateLP({
        id,
        title,
        headline,
        subheadline,
        technologies,
        github_url,
        live_demo_url,
        images
      });

      return res.json(updatedLp);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async handleDelete(req: Request, res: Response) {
    const { id } = req.params;
    const landingPageService = new LandingPageService();

    try {
      const result = await landingPageService.deleteLP(id);
      return res.json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { LandingPageController };