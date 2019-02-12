import express = require("express")
import {Request, Response, NextFunction} from "express"
import { RolController } from "../api/controllers/rol.controller";
import { IError } from "../interfaces/ierror.interface";
import { handlerErrors } from "../handlers/errores.handler"

const Router = express.Router()

const controlador = new RolController()

console.log("rol.route")

/*const cacheo =(ftn: (req: Request,res: Response,next:NextFunction)=>Promise<any>){
 return (rq: Request, rs: Response, nx:NextFunction)=>{
     return ftn(rq,rs,nx).catch(
         (error:IError) => {
            error.status = 500
            nx(error)
            })
 }
}*/

Router.get("/", controlador.listar)
Router.get("/:id", controlador.detallar)
//cacheo debe devolver una funcion con similar estructura, m
Router.post("/", handlerErrors.cacheo(controlador.insertar))
Router.put("/:id", controlador.modificar)
Router.delete("/:id", controlador.eliminar)

export {Router}