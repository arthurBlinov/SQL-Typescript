import {Request, Response} from 'express'
import { createChat, updateChat, retrieveMessages, retrieveChat, retrieveAllChats, deleteThisChat } from '../queriesFunctions/Chat';
import { ChatWithMessages, Chat, AllChats } from '../queriesFunctions/Chat';

export const createChatOfUsers = async(req:Request, res:Response) => {
    try {
        const {userid, meid} = req.params;
        const result: string = await createChat(Number(userid), Number(meid));
        if(result){
            res.send('created');
            return ;
        }
        
    } catch (error) {
        res.json(error)
    }
}
export const updateChatOfUsers = async(req: Request, res:Response) => {
    try {
        const {chatId} = req.params;
        const result: string = await updateChat(Number(chatId));
        if(result){
            res.send('updated');
            return ;
        }
        
    } catch (error) {
        res.json(error)

    }
}

export const getChat = async(req:Request, res:Response) => {
    
    try {
        const {chatId} = req.params;
        const date: Chat = await retrieveChat(Number(chatId));
        const chat: ChatWithMessages = await retrieveMessages(Number(chatId));
        if(date && chat){
            res.json({
                date,
                chatId,
                chat
            })
            return ;   
        }
        
    } catch (error) {
        res.json(error)

    }
}
export const getAllChats = async(req:Request, res:Response) => {
    
    try {
        const {meId} = req?.params;
        const chats: AllChats | undefined = await retrieveAllChats(Number(meId));
        if(chats){
            res.json(chats);
            return ;
        }
        
    } catch (error) {
        res.json(error)
    }
}
export const deleteChat = async(req:Request, res:Response) => {
    
    try {
        const {chatId} = req.params;
        const ifChatDeleted: string | undefined = await deleteThisChat(Number(chatId));
        if(ifChatDeleted){
            return res.send('deleted');
        }
           
    } catch (error) {
        res.json(error)

    }

}
