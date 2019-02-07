// Importaciones
import express = require("express")
import {Request, Response, NextFunction} from "express"
import {Router as routerIndex} from "./routes/index.route"
import {Router as routerUsuario} from "./routes/usuario.route"
import { handlerErrors } from "./handlers/errores.handler";

// Declaraciones
const app = express()

// Archivos estáticos
//app.use(express.static("./public"))

// Rutas
app.use("/", routerIndex)
app.use("/usuario", routerUsuario)

// Manejadores de Errores
app.use(handlerErrors.notFound)
app.use(handlerErrors.general)

app.listen(4000, ()=>console.log("Servidor ejecutándose en el puerto 4000"))