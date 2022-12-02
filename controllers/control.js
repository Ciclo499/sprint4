import {
  insert,
  query,
  autenticacion,
  conectarCliente,
  updateCarrito,
  consultarCarrito,
  updateProductos, actualizarVenta} from '../dataBase/db.js';
import { autenticacionAdmin, conectarAdmin } from '../dataBase/db2.js';
import {
  obtenerProductos,
  buscarProducto,
  obtenerProductosAdmin,
} from '../dataBase/db.js';

export function registrar(req, resp) {
  let datos = query(req.body.id, req.body.email).then((data) => {
    guardar(data);
  });

  function guardar(data) {
    if (data == null) {
      insert(req.body).then(() => resp.send("usuario guardado exitosamente"));
    } else {
      resp.send("El usuario ya está registrado");
    }
  }
}


export function autenticar(req, resp) {
  if (req.body.userType == true) {
    conectarCliente();
    let datos = autenticacion(req.body.email, req.body.password).then((data) =>
      credenciales(data)
    );
  } else {
    conectarAdmin();
    let datos = autenticacionAdmin(req.body.email, req.body.password).then(
      (data) => credenciales(data)
    );
  }

  function credenciales(data) {
    if (data != null) {
      console.log("Credenciales correctas");
      resp.send(data);
    } else {
      console.log("Credenciales incorrectas");
      resp.send({ id: "" });
    }
  }
}

export function getProductos(req, resp) {
  obtenerProductos().then((data) => {
    resp.send(data);
  });
}
export function getProductosAdmin(req, resp) {
  obtenerProductosAdmin().then((data) => {
    resp.send(data);
  });
}

export let addCarrito = (req, resp) => {
  let datos = req.body;
  let idUser = datos[datos.length - 1];
  let datosCarrito = [];
  for (let i = 0; i < datos.length - 1; i++) {
    datosCarrito.push(datos[i]);
  }

  updateCarrito(idUser, datosCarrito)
    .then(() => resp.send("Productos guardados en el carrito"))
    .catch((err) => resp.send(err));
  
};

export let verCarrito = (req, resp) => {
  let datosCarrito = [];
  let idUser = req.body.id;
  let carrito = consultarCarrito(idUser)
    .then((data) => buscarProducto(data))
    .then((datos) => resp.send(datos))
    .catch((err) => resp.send({ _id: "" }));
};

export let comprar = (req, resp) => {
  let datosCarrito = req.body.carrito; // array
  let datosProductos = [];
  for (let i = 0; i < datosCarrito.length; i++) {
    datosProductos.push(datosCarrito[i].nombre);
    datosProductos.push(datosCarrito[i].cantidad);

  }
  let idUser = req.body.usuario.id;
  
  updateProductos(idUser, datosProductos)
    .then(() => resp.send("Productos descontados del carrito"))
    .catch((err) => resp.send("Error"));
};

