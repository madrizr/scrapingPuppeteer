const puppeteer = require('puppeteer');
const writeJson = require('./tools.service')

const extraerEnlacesIpadAmazon = () => {
    
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
    
      await page.goto('https://www.google.com');
      await page.screenshot({ path: './assets/GooglePage.jpg', fullPage: true })
    
      // Set screen size
      await page.setViewport({width: 1080, height: 1024});
    
      // Type into search box
      await page.type('#APjFqb', 'amazon');
    
      // Espere y haga clic en el primer resultado
      await Promise.all([
        page.keyboard.press('Enter'),
        page.waitForNavigation(),
        // page.waitForSelector('[data-hveid]'),
        page.waitForTimeout(2000),
        page.screenshot({ path: './assets/ResultadosBusqueda.jpg', fullPage: true }),
      ])
      
    
     const enlace =  await page.evaluate(() => {
        return document.querySelector('.eKjLze a').href;
    })
    console.log(enlace)
      await page.goto('https://www.amazon.com/-/es/');
      await page.waitForTimeout(3000);
      await page.screenshot({ path: './assets/EntrarAmazon.jpg', fullPage: true });
    
      // Nueva busqueda
      await page.type('#twotabsearchtextbox', 'ipad');
      await page.keyboard.press('Enter');
      await page.waitForNavigation();
      //  await page.waitForSelector('.s-title-instructions-style');
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
        
      for(let enlace = 0; enlace < 5; enlace++){
    
        await page.goto(enlaces[enlace], { waitUntil: 'networkidle2', timeout: 0});
        // await page.waitForTimeout(3000)
        await page.waitForSelector('#productTitle');
        await page.waitForSelector('.a-price span');
        // await page.waitForNavigation();

        const tempEv = await page.evaluate(()=>{ // Para inspeccionar la pagina usamos evaluate(), y dentro manipulamos los eleentos html con javascript nativo
            const temp = {};
            temp.title = document.querySelector('#productTitle').innerText;
            temp.price = document.querySelector('.a-price span').innerText;
            return temp
        })
        titles.push(tempEv);
      } 
      console.log(titles)
      writeJson(titles, "../json/titles.json");
      await browser.close();
    })();
}

module.exports = {
    extraerEnlacesIpadAmazon
}