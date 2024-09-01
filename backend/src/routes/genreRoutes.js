import express from 'express';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication';
import {
  createGenre,
  getGenre,
  getGenres,
} from '../controllers/genreController';

const router = express.Router();

router
  .route('/')
  .post(authenticateUser, authorizePermissions('admin'), createGenre)
  .get(authenticateUser, authorizePermissions('admin'), getGenres);
router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('admin'), getGenre);

export default router;
