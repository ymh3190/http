import express from 'express';
import {
  createVideo,
  getVideo,
  getVideos,
} from '../controllers/videoController';

const router = express.Router();

router.route('/').post(createVideo).get(getVideos);
router.route('/:id').get(getVideo);

export default router;
