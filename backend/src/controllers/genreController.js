import { NotFoundError } from '../errors';
import { Genre } from '../models';

export const createGenre = async (req, res) => {
  const genre = await Genre.create(req.body);
  res.status(201).json({ genre });
};

export const getGenres = async (req, res) => {
  const { videoId, name } = req.query;
  if (videoId) {
    const genres = await Genre.findAll({
      where: { videoId },
    });
    res.status(200).json({ genres });
    return;
  }
  if (name) {
    const genres = await Genre.findAll({
      where: { name },
    });
    res.status(200).json({ genres });
    return;
  }
  const genres = await Genre.findAll();
  res.status(200).json({ genres });
};

export const getGenre = async (req, res) => {
  const { id } = req.params;
  const genre = await Genre.findByPk(id);
  if (!genre) {
    throw new NotFoundError('Genre not found');
  }
  res.status(200).json({ genre });
};
