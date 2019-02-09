import mongoose = require("mongoose")
mongoose.Promise = global.Promise

mongoose.connect("mongodb://area51:Un!2812&@clusterarea51-shard-00-00-e5cdu.mongodb.net:27017,clusterarea51-shard-00-01-e5cdu.mongodb.net:27017,clusterarea51-shard-00-02-e5cdu.mongodb.net:27017/area51?ssl=true&replicaSet=ClusterArea51-shard-0&authSource=admin&retryWrites=true", {useNewUrlParser: true})

mongoose.connection.on("connected", ()=>console.log("conectado a mongo"))
mongoose.connection.on("error", error => console.log(error))