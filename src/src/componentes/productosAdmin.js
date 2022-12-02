import React from "react";

export function ProductosAdmin(props){
    return(
        <div>
            <h1> Productos en existencia </h1>
            <hr />
            {props.productos.map(element => {
                return(
                    <div key={element.id}>
                        <div class="row"> 
                            <div class="col-12"> 
                                <strong> Producto: </strong> {element.nombre}
                                <br/>
                                <strong > Cantidad: </strong> {element.cantidad} 
                                <br/>
                                <strong > Precio: </strong> {'$'+element.precio} 
                            </div>
                            <hr/>
                        </div>                               
                    </div> 
                )})
            }
        </div>
    )
}
