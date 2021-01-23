import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items found');
    return;
  }

  const order = await Order.create({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json(order);
});

const getOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json(order);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  if (!orders || !orders.length) {
    res.status(404);
    throw new Error('No orders found');
  }
  res.json(orders);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id});
  if (!orders || !orders.length) {
    res.status(404);
    throw new Error('You have no orders');
  }
  res.json(orders);
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updatePaidOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateDeliveredOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

export {addOrderItems, getOrder, getMyOrders, getOrders, updatePaidOrder, updateDeliveredOrder};
