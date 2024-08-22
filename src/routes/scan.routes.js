import { Router } from "express";
import { Scan } from "../controllers/scan.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/scan").post(
    upload.fields([{ name: "fileScan", maxCount: 1 }]), 
    Scan
);

export default router;
