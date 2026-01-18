const puppeteer = require('puppeteer');
const fs = require('fs');
const { home } = require('./pages/home');
const { movies } = require('./pages/movies');
const { tvshows } = require('./pages/tvshows');
const { search } = require('./pages/search');

async function writeJson(path, jsonData) {
  await fs.writeFile(path, jsonData, err => {
    if (err) {
      console.log('Error writing file', err)
    }
  })
}

const readJson = async (path) => {
  try {
    const data = await fs.readFileSync(path, { encoding: 'utf8'});
    if (data == "" || data == "{}")
      return null;
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
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

const scrape = async (browserInstance, data, check = true) => {
    let browser;
    let returnData = null;
    if (check) {
      try {
        switch (data) {
        case "home":
        returnData = await readJson("./cache/home.json");
        break;
        case "movies":
        returnData = await readJson("./cache/movies.json");
        break;
        case "tv-shows":
        returnData = await readJson("./cache/tvshows.json");
        break;
      }
    } catch (err) {
      console.log("Error reading JSON", err);
    }
            if (returnData)
        return returnData;
    }
    try {
      browser = await browserInstance;
      let page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
      await page.setViewport({
        width: 640,
        height: 2560,
        deviceScaleFactor: 1,
      });
      switch (data) {
          case "home":
              returnData = await home(page);
              writeJson("./cache/home.json", JSON.stringify(returnData));
              break;
          case "movies":
              returnData = await movies(page);
              writeJson("./cache/movies.json", JSON.stringify(returnData));
              break;
          case "tv-shows":
              returnData = await tvshows(page);
              writeJson("./cache/tvshows.json", JSON.stringify(returnData));
              break;
          default:
              returnData = await search(page, data);
              break;
        }
    } catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
    return returnData;
}

module.exports = {
    startBrowser,
    scrape
}
