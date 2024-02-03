import { Request, Response } from 'express';
import { addUser, updateUsersPhoto, updateNameOfUser, getUser, toBlockUser, getAllUsersOfWhats } from '../queriesFunctions/Users';
import { UserWithPhoto } from '../queriesFunctions/Users';
import { RequestWithMe } from '../middleware/auth/auth';
export const addUsers = async(req:Request, res:Response) => {
    
    try {
        const {name, tel} = req?.body;
        const {me} = req as RequestWithMe;
        const result: string = await addUser(name, tel, Number(me?.id));
        if(result === 'ok'){
            res.send('added');
            return ;
        }
        
    } catch (error) {
        res.json(error)
   
    }
   
}
export const updateUserPhoto = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
          }
        
        const result: string = await updateUsersPhoto(req.file.buffer, Number(id));
        if(result === 'ok'){
            res.send('uploaded photo');
            return ;

        }
        
    } catch (error) {
        res.json(error)

    }
    
}
export const updateName = async(req:Request, res: Response) => {
    try {
        const {id} = req.params;
        const {name} = req?.body;
        const result: string = await updateNameOfUser(name, Number(id));
        if(result){
            res.send('updated');
            return ;

        }
       
    } catch (error) {
        res.json(error)

    }
    

}

export const retrieveUser = async(req:Request, res:Response) => {
    try {
    
        const {id} = req.params;
        const userWithPhoto: UserWithPhoto = await getUser(Number(id));    
        if (userWithPhoto) {
            res.json(userWithPhoto)
        }
        
    } catch (error) {
        res.json(error)

    }

}
export const retrieveAllUsersOfWhats = async(req: Request, res: Response) => {
    try {
        const {limit} = req.query;
        const usersWithPhoto: UserWithPhoto[] | undefined = await getAllUsersOfWhats(Number(limit));
        if(usersWithPhoto){
                res.json(usersWithPhoto);
        } 
            
    } catch (error) {
        res.json(error);
    }
}
export const blockUser = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const result: string = await toBlockUser(Number(id));
        if(result){
            res.send('blocked');
            return ;
        }
      

    } catch (error) {
        res.json(error)
     
    }
}    
   