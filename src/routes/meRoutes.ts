import express from 'express';
import {registerMe, updateName, updatePhoto, retrieveMe, deleted, addUser, getAllUsers, login} from '../controllers/Me';
import upload from '../multer/storage';
import { authMiddleware } from '../middleware/auth/auth';
const meRoute = express.Router();

meRoute.post('/create', registerMe);
meRoute.post('/login', login);
meRoute.put('/my-photo/:id', upload.single('photo'), authMiddleware, updatePhoto);
meRoute.put('/update-me/:id', authMiddleware, updateName);
meRoute.get('/retrieve/:id', authMiddleware, retrieveMe);
meRoute.get('/allusers/:id', getAllUsers);
meRoute.delete('/deleted/:id', deleted);
meRoute.put('/add/:idusers/for/:id', addUser);

export default meRoute;