import express from 'express';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication';
import {
  createVideo,
  getVideo,
  getVideos,
} from '../controllers/videoController';

const router = express.Router();

router
  .route('/')
  .post(authenticateUser, authorizePermissions('admin'), createVideo)
  .get(authenticateUser, authorizePermissions('admin'), getVideos);
router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('admin'), getVideo);

export default router;
