import express from 'express'
import shipmentController from '../controllers/shipment.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// All shipment routes require authentication
router.use(authMiddleware);

router.post('/', shipmentController.createShipment);
router.get('/', shipmentController.getAllShipments);
router.get('/:id', shipmentController.getShipmentById);
router.put('/:id', shipmentController.updateShipment);
router.delete('/:id', shipmentController.deleteShipment);

export default router;
