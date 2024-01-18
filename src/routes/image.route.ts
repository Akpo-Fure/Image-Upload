import express from "express";
import { uploadImage, getImage } from "../controllers/image.controller";

const router = express.Router();

router.post("/upload", uploadImage);
router.get("/get_image", getImage);

export default router;
