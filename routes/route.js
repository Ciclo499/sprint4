import express from 'express'
import {registrar, autenticar, getProductos, getProductosAdmin, addCarrito, verCarrito, comprar} from '../controllers/control.js'
import path from 'path'
import { insertarProducto, buscarProducto, consultar, eliminar, actualizar, actualizarVenta } from '../dataBase/db.js'




let dirFront = path.join(path.resolve(), 'src', 'build')
const router = express.Router()


router.get('/', function(req, resp){
    resp.sendFile(dirFront+"/index.html") 
})

router.get('/home', function(req, resp){
    resp.sendFile(dirFront+"/index.html") 
})
router.post('/registrar', function(req, resp) {
    registrar(req, resp)
})

router.post('/autenticacion', function(req, resp){
    autenticar(req, resp)
})

router.get('/productos', function (req, resp) {
    getProductos(req, resp)
})
router.get('/productosAdmin', function (req, resp) {
    getProductosAdmin(req, resp)
})

router.get('/modificarProductos', function (req, resp) {
    getProductosAdmin(req, resp)
})

router.post('/agregarCarrito', (req, resp) => {
    addCarrito(req, resp)
})

router.post('/verCarrito', (req, resp) => {
    verCarrito(req, resp)
})

router.post('/comprar', (req, resp) => {
    let datos = req.body
    comprar(req, resp)
    actualizarVenta(datos)


})
router.post('/consultarProducto', (pet,res)=>{
    let datos = pet.body
    let documento = consultar(datos.id)
    .then(datos => res.send(datos))
    .catch(err=> res.send({err:err}))
})

router.post('/guardarProducto', function(req,res){
    let datos = req.body
    insertarProducto(datos)
    .then(()=>res.send("Producto guardado"))
})

router.post('/actualizarProductos', function(req,res){
    let datos = req.body
    actualizar(datos)
    .then(()=>res.send("Producto actualizado"))
})

router.post('/actualizarVenta', function(req,res){
    actualizarVenta(datos)
    .then(()=>res.send("Producto actualizado"))
})

router.post('/eliminarProductos', function(req,res){
    let datos = req.body
    eliminar(datos)
    .then(()=>res.send("Producto eliminado"))
    .catch(err=> res.alert(err))

})


export {router}