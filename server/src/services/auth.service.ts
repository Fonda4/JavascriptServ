import { LoggerService } from "./logger.service";
import { AuthenticatedUser } from "../models/user.model";
import { UsersService } from "./user.services";
import * as bcrypt from 'bcrypt'; 
import { generateFakeToken } from "../utils/token.utils";

export class AuthService{
    private static login  ( username:string, password:string): AuthenticatedUser |undefined {
        try{
            const user = UsersService.getByUserName(username);

            if(!user){
                LoggerService.error(`erreur : l'utilisateur ${username} n'extiste pas`);
                return undefined;
            }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
      
      if (!isPasswordValid) {
        LoggerService.error(`Connexion échouée : Mot de passe incorrect pour "${username}".`);
        return undefined;
      }

      const token = generateFakeToken(user.username);

      if (!token) {
        LoggerService.error(`Connexion échouée : Impossible de générer le token.`);
        return undefined;
      }
    const authenticatedUser: AuthenticatedUser ={
        username: user.username,
        token :token
    };
    return authenticatedUser;
    
    }catch{
        LoggerService.error('error')
    }
    
}







}