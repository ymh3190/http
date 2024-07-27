import { NotFoundError } from "../errors";
import { Video } from "../models";

export const createVideo = async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json({ video });
};

export const getVideos = async (req, res) => {
  const videos = await Video.findAll();
  res.status(200).json({ videos });
};

export const getVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findByPk(id);
  if (!video) {
    throw new NotFoundError("Video not found");
  }
  res.status(200).json({ video });
};
