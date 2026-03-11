import { NewUser, User, UserDBO } from '../models/user.model';
import { FilesService } from "./files.service";
import { LoggerService } from './logger.service';
import * as bcrypt from 'bcrypt'; 

export class UsersService {

  private static readonly FILE_PATH = 'data/users.json';

  public static getByUserName(username: string): User | undefined {
    try {
      const usersDBO = FilesService.readFile<UserDBO>(this.FILE_PATH);
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
      
    } catch (error) {
      LoggerService.error(error);
      return undefined;
    }
  }

  public static create(newUser: NewUser): User | undefined {
    try {
      const existingUser = this.getByUserName(newUser.username);
      if (existingUser) {
        LoggerService.error(`Création échouée: L'utilisateur "${newUser.username}" existe déjà.`);
        return undefined;
      }

      const hashedPassword = bcrypt.hashSync(newUser.password, 10);

      const userToSaveDBO: UserDBO = {
        username: newUser.username,
        password: hashedPassword,
        role: newUser.role,
        email: newUser.email,
        last_name: newUser.lastName,
        first_name: newUser.firstName
      };

      const usersDBO = FilesService.readFile<UserDBO>(this.FILE_PATH);
      usersDBO.push(userToSaveDBO);
      FilesService.writeFile(this.FILE_PATH, usersDBO);

      const createdUser: User = {
        username: newUser.username,
        password: hashedPassword,
        role: newUser.role,
        email: newUser.email,
        lastName: newUser.lastName,
        firstName: newUser.firstName
      };

      return createdUser;

    } catch (error) {
      LoggerService.error(error);
      return undefined;
    }
  }
}
