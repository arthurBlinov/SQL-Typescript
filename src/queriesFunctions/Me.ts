import db from '../config/database/dbConnection';
import { UserWithPhoto } from './Users';
import bcrypt from 'bcryptjs';

export type MeWithPhoto = {
  id: number;
  my_name: string;
  tel_number: string;
  image: Buffer; 
};
export type Photo = {
  image: Buffer
}
const checkIfMeExists = async(tel_number: string):Promise<Boolean> => {
    
    try {
      const sql = "SELECT * FROM me WHERE tel_number = ?";
      const result: Object = await db.query(sql, [tel_number]);
      if(Object.values(result)[0]?.length){
        return true;
      }
        return false;  
    } catch (error) {
      throw error;  
    }
}
export const create = async(my_name: string, tel_number: string,password: string): Promise<string> => {
  try {
    const ifExists: Boolean = await checkIfMeExists(tel_number);
    if(ifExists){
      throw new Error('User Already Exists');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let sql = `INSERT INTO me (my_name, tel_number, password) VALUES (?, ?, ?)`;
    let result: Object = await db.execute(sql, [my_name, tel_number, hash]);
    sql = `INSERT INTO users (name, telNumber) VALUES (?, ?)`;
    result = await db.execute(sql, [my_name, tel_number]);
    if(result){
      return 'ok'
    }
    return 'not ok';
  } catch (error) {
    throw error; 
  }
}
// export const findByTelephoneQuery = async(tel_number:string): Promise<MeWithPhoto> => {
//   const sql = `SELECT * FROM me WHERE tel_number = ?`;
//   const me
// } 
export const loginQuery = async(tel_number: string, password: string): Promise<MeWithPhoto> => {
    try {
      const sql = "SELECT * FROM me WHERE tel_number = ?";
      const me: Object = await db.query(sql, [tel_number]);
      
      if(!me){
        throw new Error;
       
      } 
      const isPassword = bcrypt.compareSync(password, Object.values(me)[0][0]?.password);
        if(!isPassword){
          throw new Error;
        }
      return Object.values(me)[0][0] as MeWithPhoto;
    } catch (error) {
      throw error;
    }
}
export const updateMyPhoto = async(imageBuffer: Buffer, id: number): Promise<Photo> => {
   
  try {
        let sql: string = 'UPDATE me SET image = ? WHERE id = ?';
        await db.execute(sql, [imageBuffer, id]);
        sql = 'SELECT image FROM me WHERE id = ?';
        const result: Object = db.query(sql, [id]);
        
        if(result){
          return result as Photo;
        }
        throw new Error('no result')
        
      } catch (error) {
          throw error;
      }
}
export const updateMyName = async(my_name:string, id: number): Promise<string> => {
      
      try {
        const sql: string = 'UPDATE me SET my_name = ? WHERE id = ?';
        const result: Object = await db.execute(sql, [my_name, id]);
        if(result){
          return 'ok';
        }
        return 'not ok';
      } catch (error) {
        throw error;
      }
} 
export const getMe = async(id: number): Promise<MeWithPhoto> => {
      
      try {
        const sql: string = 'SELECT id, my_name, tel_number, image FROM me WHERE id = ?';
        const result: Object = await db.query(sql, [id]);
        if(result){
          return result as MeWithPhoto;
        }
        throw new Error;
      } catch (error) {
        
        throw error;
      }
}

export const deleteMe = async(id: number): Promise<string> => {
  try {
    const sql: string = 'DELETE FROM me WHERE id = ?;';
    const result: Object = await db.query(sql, [id]);
    if(result){
      return 'ok'
    }
    return 'not ok';
  } catch (error) {
    throw error;
  }
}
const findUserInMe = async(id: number, idusers: number): Promise<Boolean> => {
    
    try {
        const sql: string = `SELECT u.* FROM users u JOIN me m ON u.me_id = m.id 
                                    WHERE u.idusers = ? AND m.id = ?;`;
        const result: Object = await db.execute(sql, [idusers, id]);
        const ifExists: number = Object.values(result)[0][0]?.idusers; 
    if(ifExists){
       return true;
    }
    return false;    
    } catch (error) {
        throw error;
    }
}
export const addUserToMe = async(idusers: number, id: number):Promise<string> => {
    try {
        const ifUserExists: Boolean = await findUserInMe(id, idusers);
        if(ifUserExists){
            throw new Error('user already exists');
        }
       
      const sql = `UPDATE users
      SET me_id = ?
      WHERE idusers = ?;`;
      const result: Object = await db.execute(sql, [id, idusers]);
      
      if(result){
        return 'ok'
      }
      return 'not ok';
    } catch (error) {
      throw error;
    }
}
export const getAllUsersOfMe = async(id: number): Promise<UserWithPhoto[]> => {
    
      try {
        
        const sql = `SELECT * FROM users WHERE me_id = ?`;
        const result: Object = await db.query(sql, [id]);
        if(result){
            return result as UserWithPhoto[];
        }
            throw new Error;
        } catch (error) {
            throw error;
        }
}