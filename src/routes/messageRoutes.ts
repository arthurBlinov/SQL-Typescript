import express from 'express';
import { create, updateMess } from '../controllers/Message';
import upload from '../multer/storage';
import { authMiddleware } from '../middleware/auth/auth';
const messageRoute = express.Router();

messageRoute.post('/:chatId/create-message', authMiddleware, upload.single('photo'), create);
messageRoute.put('/:messageId/update-message', updateMess);

export default messageRoute;