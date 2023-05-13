"use strict"
const express = require("express");
require('dotenv').config()
const cors = require('cors');
const { extraerEnlacesIpadAmazon } = require('./services/scraper.service');
const start = require('./rutes/start')

// Crear el servidor express
const app = express();

// configurar cors
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api', start );

//Ejecucion
setInterval(extraerEnlacesIpadAmazon, 180000)
// extraerEnlacesIpadAmazon()

app.listen( process.env.PORT, () => {
  console.log('servidor corriendo en puerto ' + process.env.PORT);
})

/*(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.google.com');
  await page.screenshot({ path: './assets/GooglePage.jpg', fullPage: true })

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('#APjFqb', 'amazon');

  // Espere y haga clic en el primer resultado
  const searchResultSelector = '[data-hveid]';
  await page.keyboard.press('Enter');
  await page.waitForSelector(searchResultSelector);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: './assets/ResultadosBusqueda.jpg', fullPage: true });

 const enlace =  await page.evaluate(() => {
    return document.querySelector('[data-hveid=CAoQAA] a').href;
})
console.log(enlace)
  await page.goto('https://www.amazon.com/-/es/');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './assets/EntrarAmazon.jpg', fullPage: true });

  // Nueva busqueda
  await page.type('#twotabsearchtextbox', 'ipad');
  await page.keyboard.press('Enter');
  await page.waitForSelector('[data-component-type]');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: './assets/FotoBusquedadAmazon.jpg', fullPage: true });
  

  // Recolectar articulos
  await page.waitForSelector('.s-title-instructions-style');
  const enlaces = await page.evaluate(() => {
    let links = [];
    const elements = document.querySelectorAll('.s-title-instructions-style a');
    for(let element of elements){
        links.push(element.href)
    }
    return links
})
    let titles = [];
    console.log(enlaces)
  for(let enlace = 0; enlace < 4; enlace++){

    await page.goto(enlaces[enlace]);
    await page.waitForSelector('#productTitle');
    console.log('hola')
    const tempEv = await page.evaluate(()=>{ // Para inspeccionar la pagina usamos evaluate(), y dentro manipulamos los eleentos html con javascript nativo
        const temp = {};
        temp.title = document.querySelector('#productTitle').innerText;
        temp.price = document.querySelector('.a-price span').innerText;
        return temp
    })
    titles.push(tempEv);
    console.log(titles)
  } 

  await browser.close();
})();*/

