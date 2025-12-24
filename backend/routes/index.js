import express from 'express';
import authRoutes from './auth.route.js';
import shipmentRoutes from './shipment.route.js';
import userRoutes from './user.route.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/shipments', shipmentRoutes);

export default router;
