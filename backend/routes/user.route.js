import express from 'express'
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// All user routes require authentication
router.use(authMiddleware);

router.get('/', userController.getAllUsers);
router.get('/me', userController.getCurrentUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.post('/change-password', userController.changePassword);
router.delete('/:id', userController.deleteUser);

export default router;
