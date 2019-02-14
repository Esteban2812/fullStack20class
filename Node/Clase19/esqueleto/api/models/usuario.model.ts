import mongoose = require("mongoose")

//los esquemas esstan basado en la clase schema
const esquema = new mongoose.Schema(
//el esquema necesita un valor en el constructor, es la definicion de cada uno de los campos que va a tener cada modelo
{
nombre: String,

apellido: String,

correo:{ 
    type:String,
    email: true,
    //mongo crea un indice de tipo unico, creando una restriccion con el correo, como tipo de correo
    unique: true,
    required: true,
    trim: true,
    lowercase: true
},

contrasena: {
    type:String,
    required:true,
    trim: true,
    minlength: 8
},
rol: {
    type: mongoose.Schema.ObjectId,
    ref: "Rol",
    required: true
  },
refreshToken: {
    type:String,
    required:true
}

}
)

// creacion del modelo, se crea en base a un metodo estatico del mongoose que se llama model
const Usuario = mongoose.model("Usuario", esquema)
//tengo que importar mi modelo

export default Usuario