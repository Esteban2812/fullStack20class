import { Request, Response, NextFunction } from "express"
import { decodeAccessToken } from "../services/token-service";
import { access } from "fs";
import { IError } from "../../interfaces/ierror.interface";

const authentication = (req: Request, res: Response, next:NextFunction) => {
    //propiedad headers, representa el nombre de la cabecera y el valor
    
    //averiguar si ha llegado la cabecera
    //y tambien si ha llegado cabecera authorization
    if(req.headers && req.headers["authorization"]){
        const accessToken = req.headers["authorization"].split(" ")[1]
        //verificar que el access token sea valido
        decodeAccessToken(accessToken)
            .then(
                //que devuelv si se cumple da el payload
                (payload: any) => {
                    //almacenar en algun lado para usar en el siguiente middleware a  auttenticacion, el cual es locals
                    res.locals._id = payload._id
                    res.locals.nombre = payload.nombre
                    res.locals.rol = payload.rol
                    //para ir guardando en una base de datos para sasber quien va usando
                    //almacenar el id del usuario que lo inserto
                    //si se trata de productos(SAS) en tienda virtual, los productos sse guardan en registros se podria usar el campo usuario para usar el cmapo id para ver que producto pertenece a que cliente

                    //continue a lista
                    next()
                }
            )
            .catch(
                (error:any)=>{
                    res
                        .status(error.status)
                        .json({
                            status: error.status,
                            message: error.message
                        })
                }
            )
    }

    res
        .status(409)
        .json({
            status: 409,
            message: " user not logged"

        })
}

export {authentication}