import db from '../config/database/dbConnection';

export const createMessage = async(id_of_chat: number, message: string | null, image: Buffer | null, id: number): Promise<string> => {
    
    try {
        const sql = 'INSERT INTO message (id_of_chat, message, image, me_id) VALUES(?,?,?,?)';
        const result: Object = await db.execute(sql, [id_of_chat, message, image, id]);
        if(result){
            return 'ok';
        }    
        throw new Error;
    } catch (error) {
        throw error;
    }

}
export const updateMessage = async(updated_message: string | null, message_id: number): Promise<string> => {
    try {
        const sql = `UPDATE message SET updated_message = ? WHERE message_id = ?`;
        const result: Object = await db.execute(sql, [updated_message, message_id]);
        if(result){
            return 'ok';
        }    
        throw new Error;
    } catch (error) {
        throw error;
    }
}

export const deleteMessage = async(message_id: number): Promise<string | undefined> => {
    try {
        const sql = `UPDATE message SET ifDeleted = ? WHERE message_id = ?`;
        const result: Object = await db.execute(sql, [true, message_id]);
        if(result){
            return 'ok';
        }    
        throw new Error;
    } catch (error) {
        throw error;        
    }   
}
