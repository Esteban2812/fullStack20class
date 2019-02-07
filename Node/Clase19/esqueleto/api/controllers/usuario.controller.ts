import { Request, Response, NextFunction } from "express"
import { BaseController } from "./base.controller";

export class UsuarioController extends BaseController {
  constructor(){
    super("Usuario")
  }
}