import {Request, Response, NextFunction } from "express"

export class BaseController {

  constructor(private modelo: any){
    this.listar = this.listar.bind(this)
    this.detallar = this.detallar.bind(this)
    this.insertar = this.insertar.bind(this)
    this.modificar = this.modificar.bind(this)
    this.eliminar = this.eliminar.bind(this)
  }

  async listar(req: Request, res: Response, next: NextFunction) {
  const list = await this.modelo.find()
  res.json(
    {
      status: 200,
      results: list //la variable list corresponde a los usuarios (arreglos de json que vendria
                    //a ser solo un registro)
    }
  )
}
  async detallar(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id
    /*res
      .json({id: 1, nombre: "Alfonso"})
      */
     //el where va como parametro de find one, que coincida con un determinado ID, el id esta como parametro de la url siendo que la ruta se definio que iba a ver un nuevo parametro.
     const element = await this.modelo.findOne(_id)
  }
  async insertar(req: Request, res: Response, next: NextFunction) {
    /*res
      .json({status: 201, message: "Record created"})*/
      //el insertar viene datos por el body
      const data = req.body //aqui estan todos los datos
      const element = new this.modelo(data)
      //grabando
      await element.save()
      //segunda opcion en vez de pasar el objeto data
      /*const element = new this.modelo()
      element.nombre = data.nombre*/
      res.json({status: 201,message: "Document created"})

  }
  async modificar(req: Request, res: Response, next: NextFunction) {
    /*res
      .json({status: 201, message: "Record modified"})*/

      const data = req.body
      const _id = req.params.id

      
      await this.modelo.findOneAndUpdate({_id}, data)//en mongo se actualiza los datos que quiero actualizar como por ejemplo el nombre, solo pone por el modelo
      
      /*const usuario = await this.modelo.findOne()
      //findone devuelve el registro y unos meotods masas
      //antes de actualizar hay que saber si se ha encontrado al usuario
      if(usuario){
        usuario.nombre  = data.nombre
        await usuario.save()
      }*/
  }
  async eliminar(req: Request, res: Response, next: NextFunction) {
    /*res
      .json({status: 201, message: "Record deleted"})*/
      //para eliminar exste el metodo remove, recive un parametro criterio de busqueda, un json,
      //el remove busca en la coleccion, la coleccion puede tener un indice sobre el criterio de busqueda, todos los documentos que cumplan con el criterio, en este caso el eliminar es solamente para eliminar 1, y usar findOneAndRemove , busca el 1er elemento y ta no continua
      const id = req.params.id
      await this.modelo.findOneAndRemove({id})

      res
        .json({
          status:201,
          message: "Document deleted"
        })
  }
}