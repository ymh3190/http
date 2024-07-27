import express from "express";
import {
  createImage,
  getImage,
  getImages,
} from "../controllers/imageController";

const router = express.Router();

router.route("/").post(createImage).get(getImages);
router.route("/:id").get(getImage);

export default router;
