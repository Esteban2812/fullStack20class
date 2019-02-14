import jwt = require("jwt-simple")
import moment = require("moment")
import randToken = require("rand-token")

//lo ideal es poner frases
const palabraSecreta = "cualquier_cosa"

const createRefreshToken = (): string => {
    const refreshToken = randToken.uid(256)
    //almacenar la fecha de expiracion en la BD rapida como redis o nodejs
    return refreshToken
}

const decodeAccessToken = (accessToken: string):Promise<any> => {
    //forma una para implementar decode access token, porque usa promesa
    const promesa  = new Promise((resolve,reject) =>{
        try {
            const payload = jwt.decode(accessToken,palabraSecreta)    
            //con el payload puedo asegurar que el usuaro esta autenticado, lo puedo usar para autorizacion, lo que es manejo de autorizacion por roles,
            resolve(payload)
        } catch (error) {
            //digamos que el payload no se realizo, entonces a revisar el mensaje de error
            if(error.message.toLowerCase()=="token expired")
            //la fecha de expiracion paso
            {
                reject(
                    {
                        status: 401,
                        message: "Token has expired"
                    }
                )
            }//si el mensaje de error ha sdo alterado otro sera el error
            else{
                reject({
                    status: 500,
                    message: "Token invalid"
                })
            }
        }
    })

    return promesa
}

const createAccessToken = (_id: string,nombre: string,rol:string):string => {
 const payload = {
     _id,
     nombre,
     rol,
     iat: moment().unix(),
     exp: moment().add(30,"seconds").unix()
 }

 const accessToken = jwt.encode(payload, palabraSecreta)

 return accessToken;
}

export {createAccessToken,decodeAccessToken,createRefreshToken}