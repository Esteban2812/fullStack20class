import { NextFunction } from "connect";
import { runInNewContext } from "vm";

const handlerImages(){
    save: () => {
        return(req:Request,res:Response,next:NextFunction )
        
        const foto = await
        //pasar parametros: ancho y alto, la imagen se escale proporcionalmente.
        //genera la altura basado en cuanto estamos seteando el ancho
        await foto.resize(80,jimp.AUTO)
        //indicar en donde se va a grabar, si la ruta no existe la crea
        await foto.write(`./public/uploads/`${req.body.foto})
        //especficar para que se vaya al controller
        next()
    }
}

export {handlerImages}