import { Request, Response, NextFunction } from "express"
import { BaseController } from "./base.controller";
import Usuario from "../models/usuario.model";

export class UsuarioController extends BaseController {
  constructor(){
    //pasamose el modelo con el que vamos a trabajar
    
    super(Usuario)
  }
}