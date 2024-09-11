import mysql from 'mysql2/promise';

export let pool: mysql.Pool;

export const connectDatabase = async () => 
{
    try 
    {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306,  // Default MariaDB port
            waitForConnections: true,
            connectionLimit: 10,  // Max number of connections in the pool
            queueLimit: 0         // No limit on queued requests
          });
      
        console.log(`mariaDB connected successfully`);
        return pool;
    } 
    catch (error: any) 
    {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};