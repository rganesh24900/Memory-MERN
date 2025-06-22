import express from 'express'
import {signin,signup} from '../controllers/users.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin',auth,signin);
router.post('/signup',signup);

export default router