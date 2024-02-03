import { NextFunction, Request, Response } from 'express';
import { create, loginQuery, updateMyName, updateMyPhoto, getMe, deleteMe, addUserToMe, getAllUsersOfMe, Photo} from '../queriesFunctions/Me';
import { MeWithPhoto } from '../queriesFunctions/Me';
import { UserWithPhoto } from '../queriesFunctions/Users';
import { generateToken } from '../config/token/token';

export const registerMe = async(req:Request, res:Response, next: NextFunction) => {
    
    try {
        const {my_name, tel_number, password} = req?.body;
        const result: string = await create(my_name, tel_number, password);
        if(result === 'ok'){
            res.send('created');
            return ;
        }
        
    } catch (error) {
        res.json(error)
    }
   
}
export const login = async(req: Request, res: Response) => {
    try {
        const {tel_number, password} = req?.body;
        const me: MeWithPhoto = await loginQuery(tel_number, password);
    
        
        const token = generateToken(me?.id.toString());
        if(token){
            res?.json({id: me?.id, name: me?.my_name, image: me?.image, tel_number: me?.tel_number, token});
            return ;
        }
       
    } catch (error) {
        res.json(error)
    }
}
export const updatePhoto = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
          }
        
        const result: Photo = await updateMyPhoto(req.file.buffer, Number(id));
        if(result){
            res.send(result);
            return ;

        }
        
    } catch (error) {
        res.json(error)
    }
    
}
export const updateName = async(req:Request, res: Response) => {
    try {
        const {id} = req.params;
        const {my_name} = req?.body;
        const result: string = await updateMyName(my_name, Number(id));
        if(result){
            res.send('updated my my_name');
            return ;

        }
        
    } catch (error) {
        res.json(error)

    }
    

}
export const retrieveMe = async(req:Request, res:Response) => {
    try {
    
        const {id} = req.params;
        const MeWithPhoto: MeWithPhoto = await getMe(Number(id)); 
        // const {me} = req?.me as RequestWithMe;   
        if (MeWithPhoto) {
            res.json(MeWithPhoto);
            return;
        }
      
    } catch (error) {
        res.json(error)

    }

}
export const deleted = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const result: string = await deleteMe(Number(id));
        if(result){
            res.send('deleted');
            return ;
        }
       

    } catch (error) {
        res.json(error)
     
    }
} 

export const addUser = async(req: Request, res: Response) => {
    
    try {
        const {idusers, id} = req.params;
        const result: string = await addUserToMe(Number(idusers), Number(id));
        if(result){
            res.send('added');
            return ;
        }
      
    } catch (error) {
        res.json(error)

    }
}
export const getAllUsers = async(req: Request, res: Response) => {
    
    try {
        const {id} = req.params;
        const result: UserWithPhoto[] = await getAllUsersOfMe(Number(id));
        if(result){
            res.json(result);
            return ;
        }
     
    } catch (error) {
        res.json(error)

    }
}


