const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const url = 'https://www.imdb.com';
const app = express();
app.use(express.json());
app.use(cors());


app.post('/', (req, res) => {
  scrape(req.body.data).then(data =>{console.log(data);res.send({data:data})});
})

async function startBrowser() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}
function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
let bInstance = startBrowser();

async function scrape(data) {
  let browser;
  try {
    browser = await bInstance;
    let page = await browser.newPage();
    await page.setViewport({
      width: 640,
      height: 1920,
      deviceScaleFactor: 1,
    });
    await page.goto(url);
    await page.waitForSelector('.ipc-poster-card__title', {
      visible: true,
    })
    //const title = await page.$$eval('ipc-poster-card__title > span', el => el.map(e => e.innerText));
    const titles = await page.$$eval('.top-ten > div > div > div > div > .ipc-poster-card > .ipc-poster-card__title > span', el => el.map( e => e.textContent.slice(e.textContent.indexOf(' ')+1)));
    const images = await page.$$eval('.top-ten > div > div > div > div > .ipc-poster-card > .ipc-poster > .ipc-media > .ipc-image', el => el.map( e => e.src ));
    let returnData = []
    for ( i in titles)
      returnData.push({id: i,title: titles[i], image: images[i]});
    page.close();
    return returnData; 
  } catch(err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

app.listen(3000);

