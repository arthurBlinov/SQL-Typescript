import {Request, Response} from 'express'
import { createMessage, updateMessage } from '../queriesFunctions/Message'
import { RequestWithMe } from '../middleware/auth/auth';
export const create = async(req: Request, res: Response) => {
    
    try {
        const {chatId} = req.params;
        const file = req?.file?.buffer;
        const {message} = req?.body;
        const {me} = req as RequestWithMe; 
        const result: string = await createMessage(Number(chatId), message || null, file || null, Number(me?.id));
        if(result){
            res.send('created');
            return ;
        }
        
    } catch (error) {
        res.json(error)

    }
}
export const updateMess = async(req:Request, res:Response) => {
    try {
        const {messageId} = req.params;
        const {updatedMess} = req?.body;
        const result: string = await updateMessage(updatedMess || null, Number(messageId));
        if(result){
            res.send('updated');
            return ;
        }
      
    } catch (error) {
        res.json(error)

    }
}
export const deletedMessage = async(req: Request, res: Response) => {

}