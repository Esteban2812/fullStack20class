import {Request, Response,NextFunction} from "express"

//es un metodo que devuelve un middleware
//usar fn para convertir listas en arreglo
const autorizacion = (...roles)=>{
    return (req: Request, res: Response, next: NextFunction)=>{
        // roles es un arreglo que contiene ['admin','operador']
        if(roles.indexOf(res.locals.rol)>=0){
            //se ha encontrado
            //mandar return para ue no continue con la programacion
            return next()  
        }

        res
            .status(409)
            .json({
                message: "It's forbidden"
            })

    }

}

export {autorizacion}