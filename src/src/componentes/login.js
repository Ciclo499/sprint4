import React, { useState } from "react";
import '../styles/styleLogin.css'
import { Administrador } from "./administrador.js";
import { Cliente } from "./cliente.js";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";




export function Login (){
    let inicializacion = <div class="container-fluid">
                            <div class="row">
                                <div class="col"></div>
                                <div class="col" id="colPers">
                                    <img id="imagenLogin" alt="login" src="https://www.aliwell.mx/imagenes/registro/icono_sesion.png"></img>
                                    <div class="row">
                                        <div class="col"> <label> Email </label> </div>
                                        <div class="col"> <input type="email" id="emailCred" placeholder="ingrese su email" /> </div>
                                    </div>
                                    <div class="row"> &nbsp; </div>
                                    <div class="row">
                                        <div class="col"> <label> Contraseña </label> </div>
                                        <div class="col"> <input type="password" id="passwordCred" placeholder="ingrese su contraseña" /> </div>  
                                    </div>
                                    <div class="row"> &nbsp; </div>
                                    <div class="row">
                                        <div class="col-2"></div>
                                        <div class="col-8"> 
                                            <input type="radio" value="cliente" name="grupoRadio" id="cliente" defaultChecked /> Cliente 
                                            <input type="radio" value="admin" name="grupoRadio" id="admin" /> Admin 
                                            <br></br><br></br>
                                            <button onClick={autenticar} type="button" class="btn btn-primary btn-lg" > Logear </button> 
                                        </div>
                                        <div class="col-2"></div>
                                    </div>
                                </div>
                                <div class="col"></div>
                            </div>
                        </div>
    let [estado, setEstado] = useState(inicializacion)
    return(
        <div>
            {estado}
        </div>
    )  
    
    function autenticar(){
        let cliente = document.getElementById('cliente').checked
        let datos = {
            email:document.getElementById('emailCred').value,
            password:document.getElementById('passwordCred').value,
            userType:cliente
        }
        fetch('/autenticacion', {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(datos)
        })
        .then(respuesta => respuesta.json())
        .then(datos => {
            if(datos.id !== ""){
                if(cliente === true){
                    setEstado(estado=<Cliente mess={datos} />)                    
                }
                else {
                    setEstado(estado=<Administrador mess={datos}/>)
                } 
            }
            else {
                alert("Credenciales incorrectas")  
            }
        })
    
    }
}

