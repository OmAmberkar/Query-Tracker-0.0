import { createUser , userLogin} from '../controllers/registrations.controller.js'
import express from 'express';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', userLogin);

export default router;