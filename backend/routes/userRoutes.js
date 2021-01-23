import express from 'express';
import {
  login,
  getUserProfile,
  register,
  updateUserProfile,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(register).get(protect, admin, getUsers);
router.post('/login', login);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser);

export default router;
