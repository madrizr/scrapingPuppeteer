// Actualiza la api cada cierto tiempo, agregando un elemento al archivo JSON
const fs = require('fs');

const testingScraper = (funcion, time) => {
    let cont = 0;
    const actualizarContador = () => {
      leerContadorDelArchivo();
      cont++;
      guardarContadorEnArchivo();
      console.log('Contador actualizado:', cont);
    }
    const guardarContadorEnArchivo = () => fs.writeFileSync('./test/contadorPrueba.txt', cont.toString());
  
    const leerContadorDelArchivo = () => {
      if (fs.existsSync('./test/contadorPrueba.txt')) cont = parseInt(fs.readFileSync('./test/contadorPrueba.txt', 'utf8')) || 0;
      console.log('Contador inicial:', cont);
    }
    actualizarContador();
    setInterval(funcion, time, cont);
  }

  module.exports = {
    testingScraper
  };