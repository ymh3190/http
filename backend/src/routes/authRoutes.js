import express from 'express';
import { signin, signup } from '../controllers/authController';

const router = express.Router();

router.post(
  '/signup',
  (req, res, next) => {
    const { refreshToken, accessToken } = req.signedCookies;

    if (accessToken || refreshToken) return res.status(403).end();
    next();
  },
  signup,
);
router.post(
  '/signin',
  (req, res, next) => {
    const { refreshToken, accessToken } = req.signedCookies;

    if (accessToken || refreshToken) return res.status(403).end();
    next();
  },
  signin,
);

export default router;
