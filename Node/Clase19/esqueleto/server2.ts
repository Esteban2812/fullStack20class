import "body-parser" from "bodyparser"

// Modelos
empezar por la base datos
require("./api/models/usuario.model")


//middleware
app.use(
    bodyParser.urlencoded({
        //es un boolean, ejecuta en una formar, dos metodos para leer la data que viene en el body, el resultado es el mismo que lo leyo, el segundo que hace ya lo leyo, y se asigna a la propiedad body del object request
        extended: true,
        app.use(bodyParser.json())
    })
)