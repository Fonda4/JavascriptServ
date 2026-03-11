"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const files_service_1 = require("./files.service");
const logger_service_1 = require("./logger.service");
const bcrypt = __importStar(require("bcrypt"));
class UsersService {
    static getByUserName(username) {
        try {
            const usersDBO = files_service_1.FilesService.readFile(this.FILE_PATH);
            const userDBO = usersDBO.find(u => u.username === username);
            if (userDBO) {
                return {
                    username: userDBO.username,
                    password: userDBO.password,
                    role: userDBO.role,
                    email: userDBO.email,
                    lastName: userDBO.last_name,
                    firstName: userDBO.first_name
                };
            }
            return undefined;
        }
        catch (error) {
            logger_service_1.LoggerService.error(error);
            return undefined;
        }
    }
    static create(newUser) {
        try {
            const existingUser = this.getByUserName(newUser.username);
            if (existingUser) {
                logger_service_1.LoggerService.error(`Création échouée: L'utilisateur "${newUser.username}" existe déjà.`);
                return undefined;
            }
            const hashedPassword = bcrypt.hashSync(newUser.password, 10);
            const userToSaveDBO = {
                username: newUser.username,
                password: hashedPassword,
                role: newUser.role,
                email: newUser.email,
                last_name: newUser.lastName,
                first_name: newUser.firstName
            };
            const usersDBO = files_service_1.FilesService.readFile(this.FILE_PATH);
            usersDBO.push(userToSaveDBO);
            files_service_1.FilesService.writeFile(this.FILE_PATH, usersDBO);
            const createdUser = {
                username: newUser.username,
                password: hashedPassword,
                role: newUser.role,
                email: newUser.email,
                lastName: newUser.lastName,
                firstName: newUser.firstName
            };
            return createdUser;
        }
        catch (error) {
            logger_service_1.LoggerService.error(error);
            return undefined;
        }
    }
}
exports.UsersService = UsersService;
UsersService.FILE_PATH = 'data/users.json';
