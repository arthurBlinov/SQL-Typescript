import db from '../config/database/dbConnection';

export type UserWithPhoto = {
  idusers: number;
  name: string;
  telNumber: string;
  imageOfUser: Buffer; 
};

export const addUser = async(name: string, telNumber: string, me_id: number): Promise<string> => {
  const sql = `INSERT INTO users (name, telNumber, id) VALUES (?, ?, ?)`;
  try {
    const result: Object = await db.execute(sql, [name, telNumber, me_id]);
    if(result){
      return 'ok'
    }
    return 'not ok';
  } catch (error) {
    throw error; 
  }
}   
 
export const updateUsersPhoto = async(imageBuffer: Buffer, idusers: number): Promise<string> => {
   
  try {
        const sql: string = 'UPDATE users SET imageOfUser = ? WHERE idusers = ?';
        const result: Object = await db.execute(sql, [imageBuffer, idusers]);
        
        if(result){
          return 'ok'
        }
        return 'not ok';
        
      } catch (error) {
          throw error;
      }
}
export const updateNameOfUser = async(name:string, idusers: number): Promise<string> => {
      
      try {
        const sql: string = 'UPDATE users SET name = ?, WHERE idusers = ?';
        const result: Object = await db.execute(sql, [name, idusers]);
        if(result){
          return 'ok';
        }
        return 'not ok';
      } catch (error) {
        throw error;
      }
} 

export const getUser = async(idusers: number): Promise<UserWithPhoto> => {
      
      try {
        const sql: string = 'SELECT idusers, name, telNumber, imageOfUser FROM users WHERE idusers = ?';
        const result: Object = await db.query(sql, [idusers]);
        if(result){
          return result as UserWithPhoto;
        }
        throw new Error;
      } catch (error) {
        
        throw error;
      }
}
export const getAllUsersOfWhats = async(limit: number): Promise<UserWithPhoto[] | undefined> => {
  try {
    const sql: string = 'SELECT * FROM users WHERE me_id is NULL ORDER BY name ASC LIMIT ?';
    const result: Object = await db.query(sql, [limit]);
    if(result){
      return result as UserWithPhoto[];
    }
  } catch (error) {
      throw error;
  }
}
export const toBlockUser = async(idusers: number): Promise<string> => {
  try {
    const sql: string = 'UPDATE users SET ifDeleted = true WHERE idusers = ?;';
    const result: Object = await db.query(sql, [idusers]);
    if(result){
      return 'ok'
    }
    return 'not ok';
  } catch (error) {
    throw error;
  }
}

