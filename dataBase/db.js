import mongoose from "mongoose";
import crypto from 'crypto'



export let conectarCliente = () => {
    mongoose.connect('mongodb+srv://pzr:Recreo27720@ciclo4.faz7nab.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Conectado a Mongo DB atlas"))
    .catch(err => console.log(err)) 
}

let esquema = mongoose.Schema({
    _id:Number,
    name:String,
    email:String,
    password:String,
    products:Array,
    carrito:Array
}, {versionKey:false})

let esquema2 = mongoose.Schema({
    _id:Number,
    nombre:String,
    cantidad:Number,
    precio:Number,
}, {versionKey:false})

let modelo = mongoose.model('users', esquema)

let modelo2 = mongoose.model('products', esquema2)




export let query = async (id, email) => {
    let document = await modelo.findOne({$or:[{_id:id},{email:email}]})
    return document
}


export let consultarProducto = async (id) => {
    let documento = await modelo2.findOne({_id:id})
    console.log(documento)
    return documento
}
export async function insertarProducto(datos){
    let documento = new modelo2({
        _id:datos.id,
        nombre:datos.nombre,
        cantidad:datos.cantidad,
        precio:datos.precio,
        
    })
    await documento.save()
}

export let insert = async (datos) => {
    let passwordCrypto = crypto.createHash("sha512").update(datos.password).digest('hex')

    let document = new modelo({
        _id:datos.id,
        name:datos.name,
        email:datos.email,
        password:passwordCrypto,
        products:"",
        carrito:""
    })
    await document.save() 
}

export let autenticacion = async (correo, contraseña) => {
    let passwordCrypto = crypto.createHash("sha512").update(contraseña).digest('hex')
    let document = await modelo.findOne({$and:[{email:correo},{password:passwordCrypto}]})
    return document
}

export let updateCarrito = async(idUser, datosCarrito) => {
    console.log(datosCarrito)
    await modelo.updateOne({_id:idUser}, {
        $set:{
            carrito:datosCarrito
        }
    })
}

export let consultarCarrito = async(idUser) => {
    let documentos = await modelo.findById(idUser)
    return documentos.carrito
}

export let updateProductos = async(idUser, datosCarrito) => {
    
    await modelo.updateOne({_id:idUser}, {
        $set:{
            products:datosCarrito,
            carrito:""
        }
    })
}

export let obtenerProductos = async (id) => {
    let documento = await modelo2.find()    
    return documento
}
export let obtenerProductosAdmin = async (id) => {
    let documento = await modelo2.find()    
    return documento
}

export let buscarProducto = async (id) => {
    let documento = await modelo2.find({_id:id})
    console.log(documento)
    return documento
}

export let consultar = async (id) => {
    let documento = await modelo2.findOne({_id:id})
    console.log(documento)
    return documento
}

export let actualizar = async (datos) => {
    await modelo2.updateOne({datos},{
        $set:{
            nombre:datos.nombre,
            cantidad:datos.cantidad,
            precio:datos.precio,
          
        }
        
    })
}

export let actualizarVenta = async (data) => {
    let a = parseFloat(data.carrito[0].cantidad) 
    console.log(a)
    let b = a-1
    console.log(b)

    await modelo2.updateOne({data},{
        $set:{
            cantidad:b

          
        }

  })
}
  



export let eliminar = async (data) => {
    let documento = await modelo2.deleteOne(data)
    console.log(documento)
}



