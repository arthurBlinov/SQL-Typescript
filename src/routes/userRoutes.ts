import express from 'express';
import {addUsers,updateUserPhoto, 
    updateName, retrieveUser,
    blockUser,
    retrieveAllUsersOfWhats} from '../controllers/Users';
import upload from '../multer/storage';
import { authMiddleware } from '../middleware/auth/auth';
const userRoute = express.Router();

userRoute.get('/search', retrieveAllUsersOfWhats);
userRoute.post('/adduser', addUsers);
userRoute.put('/update-photo/:id', upload.single('photo'), updateUserPhoto);
userRoute.put('/update/:id', updateName);
userRoute.get('/get-user/:id', retrieveUser);
userRoute.put('/block/:id', blockUser);

export default userRoute;