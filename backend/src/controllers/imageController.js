import { NotFoundError } from "../errors";
import { Image } from "../models";

export const createImage = async (req, res) => {
  const image = await Image.create(req.body);
  res.status(201).json({ image });
};

export const getImages = async (req, res) => {
  const images = await Image.findAll();
  res.status(200).json({ images });
};

export const getImage = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findByPk(id);
  if (!image) {
    throw new NotFoundError("Image not found");
  }
  res.status(200).json({ image });
};
