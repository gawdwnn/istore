import express from 'express';
import {addOrderItems, getOrder, updateOrderStatus} from '../controllers/orderController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').patch(protect, updateOrderStatus);

export default router;
