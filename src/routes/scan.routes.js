import { Router } from "express";
import { Scan, Data } from "../controllers/scan.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/scan").post(
    upload.fields([{ name: "fileScan", maxCount: 1 }]), 
    Scan
);
router.route("/data").get(Data);

export default router;
