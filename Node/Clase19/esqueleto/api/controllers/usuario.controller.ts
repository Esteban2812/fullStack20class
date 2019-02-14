import { Request, Response, NextFunction } from "express"
import { BaseController } from "./base.controller";
import Usuario from "../models/usuario.model";
import { RSA_NO_PADDING } from "constants";
import { createAccessToken, createRefreshToken } from "../../api/services/token-service";

export class UsuarioController extends BaseController {
  constructor(){
    //pasamose el modelo con el que vamos a trabajar
    
    super(Usuario)
  }

  async login(req:Request, res: Response, next:NextFunction){
    //el metodo login reciba o no la contrasena
    //la informacon viene de un formulario y se esta enviando con un post, ademas se ocurre quitarles los espacons en blanco
    const correo = req.body.correo.toLowerCase().trim()
    const contrasena = req.body.contrasena.trim()
    //metodo asuuncrono y dbee esperarse a que se le devuelva
    const usuario = await Usuario.findOne({correo,contrasena})
    const accessToken = createAccessToken(usuario._id,usuario.nombre,usuario.rol.nombre)

    const refreshToken = usuario.refreshToken
  
    if(usuario){
      //se le debe poner a la peticion
      return res.json({accessToken,refreshToken})
    }
    //se le debe respondr a la peticion, es opcional, porque no se le debe cargar, siempre hay que dar una respuesta
    return res
            .status(409)
            .json(
              {
                status: 409,
                message: "User not found"
              }
            )
  }


  async insertar(req: Request, res: Response, next: NextFunction) {
    /*res
      .json({status: 201, message: "Record created"})*/
      //el insertar viene datos por el body
      const data = req.body //aqui estan todos los datos
      data.refreshToken=createRefreshToken()
      const element = new Usuario(data)
      //grabando
      await element.save()
      //segunda opcion en vez de pasar el objeto data
      /*const element = new this.modelo()
      element.nombre = data.nombre*/
      res.json({status: 201,message: "Document created"})

      
  }

  async newAccessToken(req: Request, res: Response, next:NextFunction){
    const refreshToken = req.body.refreshToken
    //la variable usuario contiene el usuario si es que se encuentra
    const usuario = await Usuario.findOne({refreshToken})
    if(usuario){
      const accessToken = createAccessToken(usuario._id,usuario.nombre,usuario.rol.nombre)
      //envio el access token (fue cuando usuario existe), si no existe refresh token, se dira ...
      res.json({accessToken})
    }else{
      //undefined
      // ...
      res
        .status(404)
        .json({
          status: 404,
          message: "User not logged"
        })
    }
  }
}