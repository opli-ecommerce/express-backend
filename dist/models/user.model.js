"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteOneUser = exports.findAllUsers = exports.findUserById = exports.findUserByEmail = exports.registerUser = void 0;
const database_1 = require("../configurations/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Function to register a new user
const registerUser = (name_1, email_1, password_1, ...args_1) => __awaiter(void 0, [name_1, email_1, password_1, ...args_1], void 0, function* (name, email, password, isAdmin = false) {
    try {
        // Check if user with this email already exists
        const [existingUser] = yield database_1.pool.execute('SELECT email FROM users WHERE email = ?', [email]);
        for (let object in existingUser) {
            if (object.length > 0) {
                throw new Error('User with this email already exists');
            }
        }
        // Hash the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Insert the new user into the database
        const [result] = yield database_1.pool.execute('INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, isAdmin]);
        return {
            id: result.insertId,
            name,
            email,
            isAdmin
        };
    }
    catch (error) {
        console.error(`Error registering user: ${error.message}`);
        throw error;
    }
});
exports.registerUser = registerUser;
/**
 * Find a user by their email.
 * @param email The email of the user to find.
 * @returns The user if found, otherwise null.
 */
const findUserByEmail = (email_1, ...args_1) => __awaiter(void 0, [email_1, ...args_1], void 0, function* (email, sensitive = false) {
    try {
        let rows = [];
        if (!sensitive)
            [rows] = yield database_1.pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
        else
            [rows] = yield database_1.pool.execute('SELECT  id, name, email, isAdmin, createdAt, updatedAt FROM users WHERE email = ? LIMIT 1', [email]);
        if (rows[0].length > 0) {
            return rows[0]; // Return the user record
        }
        else {
            return null; // No user found with this email
        }
    }
    catch (error) {
        console.error(`Error finding user by email: ${error.message}`);
        throw error;
    }
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, sensitive = false) {
    try {
        // Query to find a user by ID
        let rows = [];
        if (!sensitive)
            [rows] = yield database_1.pool.execute('SELECT * FROM users WHERE id = ?', [id]);
        else
            [rows] = yield database_1.pool.execute('SELECT id, name, email, isAdmin, createdAt, updatedAt FROM users WHERE id = ?', [id]);
        if (rows.length > 0) {
            return rows[0]; // Return the user record if found
        }
        else {
            return null; // Return null if no user found
        }
    }
    catch (error) {
        console.error(`Error finding user by ID: ${error.message}`);
        throw error;
    }
});
exports.findUserById = findUserById;
const findAllUsers = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (sensitive = false) {
    try {
        let rows = [];
        if (!sensitive)
            [rows] = yield database_1.pool.execute('SELECT * FROM users');
        else
            [rows] = yield database_1.pool.execute('SELECT id, name, email, isAdmin, createdAt, updatedAt FROM users');
        return rows;
    }
    catch (error) {
        console.error(`Error finding users: ${error.message}`);
        throw error;
    }
});
exports.findAllUsers = findAllUsers;
const deleteOneUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield database_1.pool.execute('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }
    catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        throw error;
    }
});
exports.deleteOneUser = deleteOneUser;
const updateUser = (id, name, email, isAdmin) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateUser = updateUser;
