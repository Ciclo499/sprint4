import mongoose from "mongoose";

export let conectarAdmin = () => {
    mongoose.connect('mongodb+srv://pzr:Recreo27720@ciclo4.faz7nab.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Conectado a Mongo DB atlas"))
    .catch(err => console.log(err))
}
 

let esquema = mongoose.Schema({
    _id:Number,
    name:String,
    email:String,
    password:String,
}, {versionKey:false})



let modelo = mongoose.model('admins', esquema)



export let autenticacionAdmin = async (correo, contraseña) => {
    let document = await modelo.findOne({$and:[{email:correo},{password:contraseña}]})
    return document
}


