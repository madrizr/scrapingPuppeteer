const fs = require('fs'); 
const path = require('path');
const express = require('express');
const { exec } = require('child_process');

const writeJson = async (content, url) => {
    const pathJson = path.join(__dirname, url);

    await fs.writeFile(pathJson, JSON.stringify(content),'utf8', (err) => { 
        if (err) throw err; 
        console.log('The file has been saved!'); 
      });
}

// Función para reiniciar el servidor
const restartServer = () => {exec(`nodemon start`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al reiniciar nodemon: ${error}`);
    return;
  }
  console.log('reset')
})
}

function testingScraper(funcion, intervalo, veces, prueba) {
  let contador = 0;
  const intervalID = setInterval((prob) => {
    funcion(prob);
    prueba++;
    contador++;

    if (contador === veces) {
      clearInterval(intervalID);
    }
  }, intervalo, prueba);
}

module.exports = {
  writeJson,
  restartServer,
  testingScraper
};