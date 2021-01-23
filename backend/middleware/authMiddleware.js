import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }

  const currentUser = await User.findById(decoded.id).select('-password');

  if (!currentUser) {
    res.status(401);
    throw new Error('The user with this token does no longer exist.');
  }

  req.user = currentUser;

  next();
});

const admin = (req, res, next) => {
  if (!req.user && !req.user.isAdmin) {
    res.status(401);
    throw new Error('You are not authorized to perform this action');
  }
  next();
};

export {protect, admin};
