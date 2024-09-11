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
exports.getUserById = exports.deleteUser = exports.getUsers = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jwt_token_1 = require("../helpers/jwt-token");
const user_model_1 = require("../models/user.model");
//import { User } from '../models/user.model';
/**
 * @public
 * POST request
 * @route /api/users/register
 * Controller to register a new user
 */
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield (0, user_model_1.registerUser)(name, email, password);
        const token = (0, jwt_token_1.generateToken)(user.id);
        res.status(201).json(Object.assign(Object.assign({}, user), { token }));
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
}));
/**
 * @public
 * Post request
 * @route  /api/users/login
 * Controller to generate a new token for user
 */
// export const login = asyncHandler(async (req: any, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     //This helps to complete the password match
//     const user = await findUserByEmail( email );
//     if (user && (await user.matchPassword( password ))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401);
//       throw new Error('Invalid email or password');
//     }
//   } catch (error: any) {
//     throw new Error(error?.message);
//   }
// });
/**
 * @protected
 * Get request
 * @route /api/users/profile
 * Controller to fetch user profile
 */
// export const getUserProfile = asyncHandler(async (req: any, res: Response) => {
//   try {
//     const user = await User.findById(req?.user?._id);
//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       });
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error: any) {
//     throw new Error(error?.message);
//   }
// });
/**
 * @protected
 * PUT request
 * @route /api/users/profile
 * Controller to update a user profile
 */
// export const updateUserProfile = asyncHandler(async (req: any, res: Response) => {
//   try {
//     const user = await User.findById(req?.user?._id);
//     if (!user) {
//       res.status(404);
//       throw new Error('User not found');
//     }
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }
//     const updatedUser = await user.save();
//     res.send({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     });
//   } catch (error: any) {
//     throw new Error(error?.message);
//   }
// });
/**
 * @private for admins alone
 * Get request
 * @route /api/users
 * Controller to get all the users
 * TODO: Add pagination
 */
exports.getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_model_1.findAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
}));
/**
 * @private for admins
 * Delete request
 * @route /api/users/:id
 * Controller to remove a user from the system
 * TODO: Do not remove users entirely. Instead deactivate users
 */
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_model_1.findUserById)(req.params.id, false);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        yield (0, user_model_1.deleteOneUser)(user.id);
        res.json({ message: 'User [ ' + user.name + ' ] has been removed Successfully' });
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
}));
/**
 * @private for admins
 * Get request
 * @route /api/users/:id
 * Controller to get a user by their Id.
 */
exports.getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_model_1.findUserById)(req.params.id, false);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.json(user);
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
}));
/**
 * @private for admins
 * PUT request
 * @route  /api/users/:id
 * Controller to update a user by an admin
 */
// export const updateUser = asyncHandler(async (req: any, res: Response) => {
//   try {
//     const user = await findUserById(req.params.id);
//     if ( !user ) 
//     {
//       res.status(404);
//       throw new Error('User not found');
//     }
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.isAdmin = req.body.isAdmin || user.isAdmin;
//     const updatedUser = await user.save();
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } 
//   catch (error: any) 
//   {
//     throw new Error(error?.message);
//   }
// });
