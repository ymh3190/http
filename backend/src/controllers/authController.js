import { BadRequestError, UnauthenticatedError } from '../errors';
import { Token, User } from '../models';
import { attachCookiesToResponse, createTokenUser } from '../utils';
import crypto from 'crypto';

export const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Provide username and password');
  }

  const count = await User.count();
  const role = count === 0 ? 'admin' : 'user';
  const [_, created] = await User.findOrCreate({
    where: { username },
    defaults: { role, password },
  });
  if (!created) {
    throw new BadRequestError('User already exist');
  }
  res.status(201).end();
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError('Provide username and password');
  }

  // user exist
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  // token already exist
  const tokenUser = createTokenUser(user);
  let refreshToken = '';
  const token = await Token.findOne({ where: { userId: user.id } });
  if (token) {
    const { isValid } = token;
    if (!isValid) {
      throw new UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = token.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(200).json({ user: tokenUser });
    return;
  }

  // token doesn't exist
  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, userAgent, ip, userId: user.id };
  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(200).json({ user: tokenUser });
};
