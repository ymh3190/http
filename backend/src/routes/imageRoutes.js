import express from 'express';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication';
import {
  createImage,
  getImage,
  getImages,
} from '../controllers/imageController';

const router = express.Router();

router
  .route('/')
  .post(authenticateUser, authorizePermissions('admin'), createImage)
  .get(authenticateUser, authorizePermissions('admin'), getImages);
router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('admin'), getImage);

export default router;
