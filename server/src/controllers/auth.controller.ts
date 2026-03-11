import { LoggerService } from "../services/logger.service";
import { Request, Response, Router } from "express";

export const authController = Router();

LoggerService.debug("OK auth");

authController.post("/auth/login", (req: Request, res: Response) => {
  LoggerService.info("[POST] /auth/");


  const {username,password} = req.body;
  
  if (!username || !password){

  }

});