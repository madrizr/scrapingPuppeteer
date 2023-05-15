// Actualiza la api cada cierto tiempo, agregando un elemento al archivo JSON
const fs = require('fs');
const { BehaviorSubject } = require('rxjs');

// Variable global para almacenar el contador
let contador = 3;

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
  
  const testingScraper2 = (funcion, time) => {
    
    // Crear el BehaviorSubject con el valor inicial del contador
    const contadorSubject = new BehaviorSubject(contador);

    // Incrementar el contador cada vez que se reinicie el servidor
    contadorSubject.next(contadorSubject.value + 1);

    // Suscribirse a los cambios del contador
    contadorSubject.subscribe((contador) => {
      console.log('Contador actual:', contador);
      setInterval(funcion, time, contador);
    });
  }
 

  module.exports = {
    testingScraper,
    testingScraper2
  };