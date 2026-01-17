const puppeteer = require('puppeteer');
const fs = require('fs');
const { home } = require('./pages/home');
const { movies } = require('./pages/movies');
const { tvshows } = require('./pages/tvshows');
const { search } = require('./pages/search');

async function writeJson(jsonData) {
  await fs.writeFile('./cache/home.json', jsonData, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Written to the file');
    }
  })
}

const startBrowser = async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            timeout: 10000
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

const scrape = async (browserInstance, data) => {
    let browser;
    try {
        browser = await browserInstance;
        let page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
        await page.setViewport({
          width: 640,
          height: 2560,
          deviceScaleFactor: 1,
        });
        let returnData = {};
        console.log(data);
        switch (data) {
            case "home":
                returnData = home(page);
                break;
            case "movies":
                returnData = movies(page);
                break;
            case "tv-shows":
                returnData = tvshows(page);
                break;
            default:
                returnData = search(page, data);
                break;
        }
        return returnData;
    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = {
    startBrowser,
    scrape
}
