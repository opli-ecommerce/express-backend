"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = require("./configurations/database");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 3000;
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use('/api/users', user_routes_1.default);
(0, database_1.connectDatabase)().then(connection => {
    exports.app.listen(port, () => {
        console.log(`[server] -> server is running at http://localhost:${port}`);
    });
}).catch(error => {
    console.error(`Error connecting to database: ${error.message}`);
});
exports.default = exports.app;
