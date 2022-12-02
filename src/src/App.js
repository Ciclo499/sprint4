import './App.css';
import { BarraNav } from './componentes/barraNav';
import React  from 'react';

function App() {

  return (
    <div className="App">
      <BarraNav />

    </div>
  );
}

export default App;

/*function enviarDatos(){
  fetch('http://localhost:5000/consultar')
  .then(resp=>resp.text())
  .then(data=>console.log(data))
}*/