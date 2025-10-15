// routes/about.ts
import { Router } from "npm:express";
import { getAboutPage } from "../controllers/aboutController.ts";
const router = Router();
router.get("/about", getAboutPage);
export default router;
