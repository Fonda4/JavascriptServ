import { Express } from "express";
import { EROLES, User } from "./user.model";

export interface AuthenticatedRequest extends Request{

    user ?: User;
}

export interface LoginResponseDTO {

    username : string;
    token:string;
    role:EROLES;

}