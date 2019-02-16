// Importaciones
import express = require("express")
import {Request, Response, NextFunction} from "express"
import {Router as routerIndex} from "./routes/index.route"
import {Router as routerUsuario} from "./routes/usuario.route"
import {Router as routerRol} from "./routes/rol.route"
import { handlerErrors } from "./handlers/errores.handler";
import bodyParser = require("body-parser")

import mongoose = require("mongoose")
// Declaraciones
const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// Archivos estáticos
//app.use(express.static("./public"))

// Rutas
app.use("/", routerIndex)
app.use("/usuario", routerUsuario)
app.use("/rol", routerRol)

//coneccon a BD
mongoose.Promise = global.Promise

mongoose.connect("mongodb://area51:Un!2812&@clusterarea51-shard-00-00-e5cdu.mongodb.net:27017,clusterarea51-shard-00-01-e5cdu.mongodb.net:27017,clusterarea51-shard-00-02-e5cdu.mongodb.net:27017/area51?ssl=true&replicaSet=ClusterArea51-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser: true,useCreateIndex: true})

mongoose.connection.on("connected", ()=>console.log("conectado a mongo"))
mongoose.connection.on("error", error => console.log(error))

// Manejadores de Errores
app.use(handlerErrors.notFound)
app.use(handlerErrors.general)


app.listen(4000, ()=>console.log("Servidor ejecutándose en el puerto 4000"))