import { pool } from '../configurations/database';
import bcrypt from 'bcryptjs';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

// Function to register a new user
export const registerUser = async (name: string, email: string, password: string, isAdmin: boolean = false) => {
  try {
    // Check if user with this email already exists
    const [existingUser] = await pool.execute<RowDataPacket[]>('SELECT email FROM users WHERE email = ?', [email]);
    
    for( let object in existingUser )
    {
      if( object.length > 0 )
      {
        throw new Error( 'User with this email already exists' );
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, isAdmin]
    );

    return {
      id: result.insertId,
      name,
      email,
      isAdmin
    };
  } 
  catch (error: any) 
  {
    console.error(`Error registering user: ${error.message}`);
    throw error;
  }
};

/**
 * Find a user by their email.
 * @param email The email of the user to find.
 * @returns The user if found, otherwise null.
 */
export const findUserByEmail = async (email: string, sensitive: boolean = false) => {
  try 
  {
    let rows: RowDataPacket[ ] = [ ];
    
    if( !sensitive )
      [rows] = await pool.execute< RowDataPacket[ ] >( 'SELECT * FROM users WHERE email = ? LIMIT 1', [ email ] );
    else
      [rows] = await pool.execute< RowDataPacket[ ] >( 'SELECT  id, name, email, isAdmin, createdAt, updatedAt FROM users WHERE email = ? LIMIT 1', [ email ] );

    if ( rows[ 0 ].length > 0) 
    {
      return rows[ 0 ];  // Return the user record
    } 
    else 
    {
      return null;  // No user found with this email
    }
  } 
  catch (error: any) 
  {
    console.error(`Error finding user by email: ${error.message}`);
    throw error;
  }
}; 

export const findUserById = async (id: string, sensitive: boolean = false) => {
  try {
    // Query to find a user by ID
    let rows: RowDataPacket[ ] = [ ];

    if( !sensitive )
      [rows] = await pool.execute< RowDataPacket[ ] >('SELECT * FROM users WHERE id = ?', [id]);
    else
      [rows] = await pool.execute< RowDataPacket[ ] >('SELECT id, name, email, isAdmin, createdAt, updatedAt FROM users WHERE id = ?', [id]);

    if (rows.length > 0) 
    {
      return rows[ 0 ];  // Return the user record if found
    } 
    else 
    {
      return null;  // Return null if no user found
    }
  } 
  catch (error: any) 
  {
    console.error(`Error finding user by ID: ${error.message}`);
    throw error;
  }
};

export const findAllUsers = async ( sensitive: boolean = false ) => {
  try
  {
    let rows: RowDataPacket[ ] = [ ];

    if( !sensitive )
      [rows] = await pool.execute< RowDataPacket[ ] >('SELECT * FROM users');
    else
      [rows] = await pool.execute< RowDataPacket[ ] >('SELECT id, name, email, isAdmin, createdAt, updatedAt FROM users');

    return rows;
  }
  catch( error: any )
  {
    console.error( `Error finding users: ${error.message}`);
    throw error;
  }
};

export const deleteOneUser = async ( id: string ) => 
{
    try 
    {
      const [result] = await pool.execute< RowDataPacket[ ]>( 'DELETE FROM users WHERE id = ?', [ id ]);
      return result;
    }
    catch( error: any )
    {
      console.error( `Error deleting user: ${error.message}`);
      throw error;
    }
};

export const updateUser = async ( id: string, name: string, email: string, isAdmin: boolean ) =>
{

}
