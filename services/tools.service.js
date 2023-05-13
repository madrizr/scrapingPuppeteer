const fs = require('fs'); 
const path = require('path');

const writeJson = async (content, url) => {
    const pathJson = path.join(__dirname, url);

    await fs.writeFile(pathJson, JSON.stringify(content),'utf8', (err) => { 
        if (err) throw err; 
        console.log('The file has been saved!'); 
      });
}

module.exports = writeJson;