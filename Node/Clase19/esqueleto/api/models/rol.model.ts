import mongoose = require("mongoose")

//los esquemas esstan basado en la clase schema
const esquema = new mongoose.Schema(
//el esquema necesita un valor en el constructor, es la definicion de cada uno de los campos que va a tener cada modelo
{
nombre: String
}
)

// creacion del modelo, se crea en base a un metodo estatico del mongoose que se llama model
const Rol = mongoose.model("Rol", esquema)
//tengo que importar mi modelo

export default Rol