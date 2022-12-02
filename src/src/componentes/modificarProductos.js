import React from "react";

function habilitacion(id, nombre, cantidad, precio) {
  document.getElementById('id').disabled = id
  document.getElementById("nombre").disabled = nombre;
  document.getElementById("cantidad").disabled = cantidad;
  document.getElementById("precio").disabled = precio;
}
let option;

function select() {
  option = document.getElementById("selector").value;
  if (option === "Guardar") {
    document.getElementById('id').disabled = false
    document.getElementById("nombre").disabled = false;
    document.getElementById("cantidad").disabled = false;
    document.getElementById("precio").disabled = false;
  } else if (option === "Consultar") {
    document.getElementById('id').disabled = false
    document.getElementById("nombre").disabled = true;
    document.getElementById("cantidad").disabled = true;
    document.getElementById("precio").disabled = true;
  } else if (option === "Actualizar") {
    habilitacion(false, false, false, false);
  } else {
    habilitacion(false, true, true, true);
  }
}



let url = "http://localhost:5000";

export function ModificarProductos() {
  return (
    <div>
      <form>
        <div>
          <select id="selector">
            <option>Guardar</option>
            <option>Consultar</option>
            <option>Actualizar</option>
            <option>Eliminar</option>
          </select>

          <button
            class="btn btn-secondary"
            type="button"
            onClick={() => select()}
          >
            {" "}
            Seleccionar
          </button>
        </div>
        <div class="in"><label>id</label></div>
        <div class="in"><input type="number" id="id" disabled/></div>
        <div class="in">
          <label>Nombre</label>
        </div>
        <div class="in">
          <input type="text" id="nombre" disabled />
        </div>
        <div class="in">
          <label>Cantidad</label>
        </div>
        <div class="in">
          <input type="number" id="cantidad" disabled />
        </div>
        <div class="in">
          <label>Precio</label>
        </div>
        <div class="in">
          <input type="number" id="precio" disabled />
        </div>
        <div id="btn1">
          <button
            class="btn btn-success"
            type="button"
            onClick={() => productosDatos()}
          >
            {" "}
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

function productosDatos() {
  if (option === "Guardar") {
    let datos = {
      id: document.getElementById('id').value,
      nombre: document.getElementById("nombre").value,
      cantidad: document.getElementById("cantidad").value,
      precio: document.getElementById("precio").value,
    };
    fetch( "/guardarProducto", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then((resp) => resp.text())
      .then((data) => alert(data));
      limpiar()
  } else if (option === "Consultar") {
    let datos = {
      id: document.getElementById("id").value,
    };
    fetch( "/consultarProducto", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then((res) => res.json())
      .then((data) => valores(data))
      .catch((err) => {
        alert(`'Producto no encontrado`);
        let data = { nombre:"",cantidad: "", precio: "" };
        valores(data);
      });
  } else if (option === "Actualizar") {

    let datos ={
      id:document.getElementById('id').value,
      nombre:document.getElementById('nombre').value,
      cantidad:document.getElementById('cantidad').value,
      precio:document.getElementById('precio').value

    }
    fetch('/actualizarProductos', {
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(data => actualizar(data))
    .catch(err => {let data = {id:"",nombre:"",cantidad: "", precio: "" }
          actualizar(data)
          alert("Producto Actualizado")
  })
  } else {

    let datos ={
      id:document.getElementById('id').value
    }
    fetch('/eliminarProductos', {
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(data => eliminar(data))
    .catch(err => {let data = {id:"",nombre:"",cantidad: "", precio: "" }
          eliminar(data)
          alert("Producto eliminado")
  })
}}

function actualizar(data) {

  document.getElementById("id").value = data.id;
  document.getElementById("nombre").value = data.nombre;
  document.getElementById("cantidad").value = data.cantidad;
  document.getElementById("precio").value = data.precio;


}
function eliminar(data) {

  document.getElementById("id").value = data.id;
  document.getElementById("nombre").value = data.nombre;
  document.getElementById("cantidad").value = data.cantidad;
  document.getElementById("precio").value = data.precio;


}
function valores(data) {

  document.getElementById("nombre").value = data.nombre;
  document.getElementById("cantidad").value = data.cantidad;
  document.getElementById("precio").value = data.precio;


}

function limpiar(){
  document.getElementById('id').value = ""
  document.getElementById('nombre').value = ""
  document.getElementById('cantidad').value = ""
  document.getElementById('precio').value = ""
}
