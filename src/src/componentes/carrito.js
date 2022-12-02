import React from "react";

export function Carrito(props) {
  let comprar = () => {
    alert("Compra realizada");
    console.log(props);
    fetch("/comprar", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props),
    })
      .then((resp) => resp.text())
      .then((data) => {
        alert(data);
        window.location.href = "/home";
      });
  };
  return (
    <div>
      <h1> Productos agregados al carrito </h1>
      <hr />
      {props.carrito.map((elem) => {
        return (
          <div key={elem.id}>
            <div>
              <strong>{elem.nombre}</strong>
            </div>
            <div>
              <strong>{'$'+ elem.precio}</strong>
            </div>
            <hr />
            
          </div>
          
        );

      })}
      <button type="button" class="btn btn-primary" onClick={comprar}>
        {" "}
        Comprar{" "}
      </button>

    </div>
  );
}


