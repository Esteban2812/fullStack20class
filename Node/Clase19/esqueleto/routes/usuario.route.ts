import express = require("express")
import {Request, Response, NextFunction} from "express"
import { UsuarioController } from "../api/controllers/usuario.controller";
import { handlerErrors } from "../handlers/errores.handler"
import { authentication } from "../api/policies/authentication.policyf";
import { autorizacion } from "../api/policies/autorizacion.politica"

const Router = express.Router()

const controlador = new UsuarioController()

console.log("usuario.route")

Router.get("/", authentication, autorizacion("admin","operador"), controlador.listar)
Router.get("/:id", controlador.detallar)
Router.post("/", controlador.insertar)
Router.put("/:id", controlador.modificar)
Router.delete("/:id", controlador.eliminar)
Router.post("/login", handlerErrors.cacheo(controlador.login))
Router.post("/new-access-token", handlerErrors.cacheo(controlador.newAccessToken))
export {Router}