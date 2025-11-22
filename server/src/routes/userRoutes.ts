import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

// Routes
router.post('/sync', (req, res) => userController.syncUser(req, res));
router.get('/:firebaseUid', (req, res) => userController.getProfile(req, res));

export default router;
