import {Request, Response, NextFunction } from "express"

export class BaseController {

  constructor(public modelo: any){
    this.listar = this.listar.bind(this)
    this.detallar = this.detallar.bind(this)
    this.insertar = this.insertar.bind(this)
    this.modificar = this.modificar.bind(this)
    this.eliminar = this.eliminar.bind(this)
  }

  listar(req: Request, res: Response, next: NextFunction) {
    console.log(this.modelo)
    res
      .json([
        {id: 1, nombre: "Alfonso"},
        {id: 2, nombre: "Javier"},
        {id: 3, nombre: "Kelly"},
        {id: 4, nombre: "Jana"}
      ])
  }
  detallar(req: Request, res: Response, next: NextFunction) {
    res
      .json({id: 1, nombre: "Alfonso"})
  }
  insertar(req: Request, res: Response, next: NextFunction) {
    res
      .json({status: 201, message: "Record created"})
  }
  modificar(req: Request, res: Response, next: NextFunction) {
    res
      .json({status: 201, message: "Record modified"})
  }
  eliminar(req: Request, res: Response, next: NextFunction) {
    res
      .json({status: 201, message: "Record deleted"})
  }
}