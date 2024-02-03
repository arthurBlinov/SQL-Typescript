import db from '../config/database/dbConnection';
import { UserWithPhoto } from './Users';

export type ChatWithMessages = {
    messages:[]
}
export type Chat = {
    updated_at: Date
}
export type AllChats = [];
export type AllChatsWithUsers = [
    date: Date,
    user: UserWithPhoto
];
export interface UserInChat{
    user: UserWithPhoto,
}
export const createChat = async(user_id: number, me_id: number): Promise<string> => {
    
    try {
        let sql = `SELECT * FROM users WHERE idusers = ?`;
        let result: Object = await db.query(sql, [user_id]);
        const user: UserWithPhoto = Object.values(result)[0][0];
        sql = `INSERT INTO chat (user_id, me_id, userName, userImage) VALUES(?, ?, ?, ?)`;
        result = await db.execute(sql, [user_id, me_id, user?.name, user?.imageOfUser]);
        if(result){
            return 'ok'
        }
        return 'not ok'; 
    } catch (error) {
        throw error;
    }
}
export const updateChat = async(chat_id: number): Promise<string> => {
    
    try {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; 
        const localTime = new Date(now.getTime() - offset);
        const formattedNow = localTime.toISOString().slice(0, 19).replace('T', ' ');
        const sql = `UPDATE chat SET updated_at = ? WHERE chat_id = ?`
        const result: Object = await db.execute(sql, [formattedNow, chat_id])
        if(result){
            return 'ok'
        }
        return 'not ok'; 
    } catch (error) {
        throw error;
    }
}
export const retrieveMessages = async(chat_id: number): Promise<ChatWithMessages> => {
    try {
        const sql = `SELECT *
        FROM message
        WHERE id_of_chat = ?
        ORDER BY updated_at DESC;
        `;
        const result: Object = await db.query(sql,[chat_id]);
        const messages: Object = Object.values(result)[0];
        if(messages){
            return messages as ChatWithMessages;
        }
        throw new Error;
    } catch (error) {
        throw error;
    }
}
export const retrieveChat = async(chat_id: number): Promise<Chat> => {
    try {
        const sql = `SELECT updated_at FROM chat WHERE chat_id = ?`;
        const result: Object = await db.query(sql, [chat_id]);      
        const updatedAt: Object = Object.values(result)[0][0]?.updated_at;
        if(updatedAt){
            return updatedAt as Chat;
        }
        throw new Error;
    } catch (error) {
        throw error;
    }
}
export const retrieveAllChats = async(me_id: number):Promise<AllChats | undefined> => {
    try {
        const sql = `SELECT * FROM chat WHERE me_id = ? OR user_id = ?`;
        const result: Object = await db.query(sql, [me_id, me_id]);
        const chats: AllChats = Object.values(result)[0];
        chats.map((chat: UserWithPhoto) => {
            if(chat?.idusers !== me_id){
                return chat;
            }else if(chat?.idusers === me_id){
                
            }
        })
        
        return chats;
   } catch (error) {
        throw error;
    }
} 
export const deleteThisChat = async(chat_id: number): Promise<string | undefined> => {
    
    try {
        const sql = `UPDATE chat SET ifDeleted - ? WHERE chat_id - ?`;
        const result: Object = await db.execute(sql, [true, chat_id]);
        if(result){
            return 'ok'
        }
        return 'not ok';
    } catch (error) {
        throw error;
    }

}
