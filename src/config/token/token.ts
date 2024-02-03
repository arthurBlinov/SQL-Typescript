import jwt, { Secret } from 'jsonwebtoken';

export const generateToken = (id:string) => {
    const secret: Secret | undefined = process?.env?.JWT_KEY;
   
    if(!secret){
        throw new Error;
    } 
    return jwt.sign({id}, secret, {expiresIn: '30d'});
}

