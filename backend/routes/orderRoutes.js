import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrder,
  getOrders,
  updatePaidOrder,
  updateDeliveredOrder,
} from '../controllers/orderController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').patch(protect, updatePaidOrder);
router.route('/:id/deliver').put(protect, admin, updateDeliveredOrder);

export default router;
