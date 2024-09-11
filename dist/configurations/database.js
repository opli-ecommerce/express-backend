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
exports.connectDatabase = exports.pool = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        exports.pool = promise_1.default.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306, // Default MariaDB port
            waitForConnections: true,
            connectionLimit: 10, // Max number of connections in the pool
            queueLimit: 0 // No limit on queued requests
        });
        console.log(`mariaDB connected successfully`);
        return exports.pool;
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
});
exports.connectDatabase = connectDatabase;
