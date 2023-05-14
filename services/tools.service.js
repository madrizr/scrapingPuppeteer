const fs = require('fs'); 
const path = require('path');
const { exec } = require('child_process');

const writeJson = async (content, url) => {
    const pathJson = path.join(__dirname, url);

    await fs.writeFile(pathJson, JSON.stringify(content),'utf8', (err) => { 
        if (err) throw err; 
        console.log('Grabado exitoso'); 
      });
}

// Función para reiniciar el servidor
const restartServer = () => {
  exec(`nodemon start`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al reiniciar nodemon: ${error}`);
    return;
  }
  console.log('reset')
})
}

module.exports = {
  writeJson,
  restartServer
};