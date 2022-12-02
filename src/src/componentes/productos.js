import React from "react";

export function Productos(props){
    return(
        <div>
            <h1> Productos en existencia </h1>
            <hr />
            {props.productos.map(element => {
                return(
                    <div key={element.id}>
                        <div class="row"> 
                            <div class="col-9"> 
                                <strong> Producto: </strong> {element.nombre}
                                <br/>
                                <strong > Cantidad: </strong> {element.cantidad} 
                                <br/>
                                <strong > Precio: </strong> {'$'+element.precio} 

                            </div>
                            <div class="col-3" style={{textAlign:"left"}}>                     
                                <input type="checkbox" id={element._id}></input>
                            </div>
                            <hr/>
                        </div>                               
                    </div> 
                )})
            }
        <button class="btn btn-success" type="button" onClick={() => enviarDatos(props)}> Agregar</button> 
        </div>
    )
}
function enviarDatos(props) {
    let datos=[]
    for(let i=0; i<props.productos.length; i++) {
        let n_checkbox = document.getElementById(props.productos[i]._id).checked 
        if(n_checkbox === true){
            datos.push(props.productos[i]._id)
        }        
    }  
    if (datos === 0) {
        alert("Debe seleccionar al menos un producto")
    }
    else {
        datos.push(props.usuario)
        fetch('/agregarCarrito', {
            method:"post",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(datos)
        })
        .then(resp => resp.text())
        .then(data => alert(data))
    }    
}