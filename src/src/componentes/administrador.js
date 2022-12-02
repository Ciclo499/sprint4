import React, {useState} from 'react'
import { ModificarProductos } from './modificarProductos';
import { ProductosAdmin } from './productosAdmin'




export function Administrador(propiedades) {
  let [productos, setProductos] = useState("");
  let verProductosAdmin = (event) => {
    event.preventDefault();
    let idUser = propiedades.mess._id;
    fetch("/productosAdmin")
      .then((resp) => resp.json())
      .then((datos) => {
        console.log(datos);
        setProductos(
          (productos = <ProductosAdmin usuario={idUser} productos={datos} />)
        );
      });
  };
  let modificarAdmin = (event) => {
    event.preventDefault();
    let idUser = propiedades.mess._id;
    fetch("/modificarProductos")
      .then((resp) => resp.json())
      .then((datos) => {
        console.log(datos);
        setProductos(
          (productos = <ModificarProductos usuario={idUser} productos={datos} />)
        );
      });
  };

  let cerrarSesion = () => {
    window.location.href = "/home";
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Administrador
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="listaProductosAdmin" onClick={verProductosAdmin}>
                {" "}
                Lista productos{" "}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="modificarProductos" onClick={modificarAdmin}>
                {" "}
                Modificar productos{" "}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                {" "}
                Lista ventas{" "}
              </a>
            </li>
            <li class="nav-item">
                    <a class="nav-link" href="home" onClick={cerrarSesion}> Cerrar Sesion </a>
            </li>
          </ul>
        </div>
      </nav>
      {productos}
    </div>
  );
}
