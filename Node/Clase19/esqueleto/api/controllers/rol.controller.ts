import { Request, Response, NextFunction } from "express"
import { BaseController } from "./base.controller";
import Rol from "../models/rol.model";

export class RolController extends BaseController {
  constructor(){
    //pasamose el modelo con el que vamos a trabajar    
    super(Rol)
  }

}