import express from 'express';
import { createChatOfUsers,updateChatOfUsers, getChat, deleteChat, getAllChats} from '../controllers/Chat';
import { authMiddleware } from '../middleware/auth/auth';
const chatRoute = express.Router();

chatRoute.post('/:userid/create-chat/:meid', authMiddleware, createChatOfUsers);
chatRoute.put('/update-chat/:chatId', authMiddleware, updateChatOfUsers);
chatRoute.get('/retrieve-chat/:chatId', authMiddleware, getChat);
chatRoute.get('/retrieve-chats/:meId', authMiddleware, getAllChats);
chatRoute.put('/delete/:chatId', authMiddleware, deleteChat);

export default chatRoute;