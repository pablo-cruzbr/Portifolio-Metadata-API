
import { Router } from "express";

const router = Router(); 

router.get('/', (req, res) => {
    res.json({ message: "API Metadata Service is running!" });
});

export { router };