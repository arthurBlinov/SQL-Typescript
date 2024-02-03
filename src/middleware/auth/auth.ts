import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MeWithPhoto, getMe } from '../../queriesFunctions/Me';
interface JwtPayload {
    id: number; 
}
export interface RequestWithMe extends Request {
    me: MeWithPhoto;
}

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    let token;
    
    if(req?.headers?.authorization?.startsWith('Bearer')){
        try {
            
            token = req?.headers?.authorization?.split(' ')[1];
            
            if(token){
                const secret: string | undefined = process.env.JWT_KEY;
                
                if(secret){
                    const decoded= jwt?.verify(token, secret) as JwtPayload;
                    
                    if(decoded){
                        
                        const me: MeWithPhoto = await getMe(decoded?.id);  
                        (req as RequestWithMe).me = me;
                        next();
                        
                    }
                
                }
               
            } else{
                throw new Error ('Here There is no token attached to the header');
            }
        } catch (error) {
            throw new Error('Not authorized token expired, log in again');
        }
        }else {
            throw new Error('There is no token attached to the header')
    }
}