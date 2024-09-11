import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; dotenv.config();
import { connectDatabase } from './configurations/database';
import userRoutes from './routes/user.routes';



export const app: Express = express();
const port = process.env.PORT || 3000;

app.use( express.json( ) );
app.use( cors() );

app.use( '/api/users', userRoutes );

connectDatabase( ).then( connection => 
{
    app.listen( port, ( ) => 
    {
        console.log( `[server] -> server is running at http://localhost:${port}` );
    });
}).catch(error => 
{
    console.error(`Error connecting to database: ${error.message}`);
});

export default app;


