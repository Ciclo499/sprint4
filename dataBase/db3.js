import mongoose from "mongoose";

let structure = mongoose.Schema({
    nombre:String,
    cantidad:Number,
    precio:Number,
}, {versionKey:false})


let modelo = mongoose.model('products', structure)

