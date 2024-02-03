import mysql, {Pool} from 'mysql2/promise';


const db: Pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

export default db;