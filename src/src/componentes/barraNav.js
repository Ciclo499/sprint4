import React, { Component } from 'react'
import '../styles/styleBarraNav.css'
import { Login } from './login'
import { Registrar } from './registrar'
import { Inicio } from './inicio'
import { Contactar } from './contactar'
import { Cliente } from './cliente'
import { Productos } from './productos'
import { Carrito } from './carrito'
import { ProductosAdmin } from './productosAdmin'
import { ModificarProductos } from './modificarProductos'


import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

export class BarraNav extends Component{   
    constructor(){
        super()
        this.state = {
            estado: <Inicio />
        }
    }
    render(){
        return(
            <BrowserRouter>
                <div className='blockLinks'>
                    <Link to="/home" className='link'> Inicio </Link>
                    <Link to="/login" className='link'> Login </Link>
                    <Link to="/register" className='link'> RegistrarCliente </Link>
                    <Link to="/contactar" className='link'> Contactar </Link>
                </div>
                <Routes>
                    <Route path="/home" element={<Inicio />}></Route>
                    <Route path="/login" element={<Login />}> </Route>
                    <Route path='/register' element={<Registrar/>} ></Route>
                    <Route path='/contactar' element={<Contactar/>} ></Route>
                    <Route path="/cliente" element={<Cliente />}></Route>
                    <Route path="/carrito" element={<Carrito />}></Route>
                    <Route path="/listaProductos" element={<Productos />}></Route>  
                    <Route path="/listaProductosAdmin" element={<ProductosAdmin />}></Route> 
                    <Route path="/modificarProductos" element={<ModificarProductos />}></Route>  
 

                </Routes>
            </BrowserRouter>
        )
      /*  let iniciar = () => {
            this.setState({estado:<Inicio />})
        }
        let logear = () => {
            this.setState({estado:<Login />})
        }
        let registrar = () => {
            this.setState({estado:<Registrar />})
        }
        let contactar = () => {
            this.setState({estado:<Contactar />})            
        }
        return(
            <div >
                <div className='blockBarra'>
                    <button className='btnBarra' onClick={iniciar}> Inicio </button>
                    <button className='btnBarra' onClick={logear}> Login </button>
                    <button className='btnBarra' onClick={registrar}> Registro </button>
                    <button className='btnBarra' onClick={contactar}> Contactar </button>
                </div>
                {this.state.estado}
            </div>
        )*/
    }
}