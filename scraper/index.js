const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const homeURL = 'https://www.imdb.com';
const trendingSelector = {title:'.top-ten > div > div > div > div > .ipc-poster-card > .ipc-poster-card__title > span', image:'.top-ten > div > div > div > div > .ipc-poster-card > .ipc-poster > .ipc-media > .ipc-image'} 
const favoriteSelector = {title:'.fan-picks > div > div > div > div > .ipc-poster-card > .ipc-poster-card__title > span', image:'.fan-picks > div > div > div > div > .ipc-poster-card > .ipc-poster > .ipc-media > .ipc-image'}

const moviesURL = 'https://www.imdb.com/chart/top/';
const moviesSelector = {
  title:'.ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > div > .ipc-title > .ipc-title-link-wrapper > h3', 
  image: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > .ipc-poster > .ipc-media > .ipc-image'
};

const tvshowsURL = 'https://www.imdb.com/chart/toptv/';

const searchURL = (query) => {
  return (`https://www.imdb.com/find/?q=${query}&s=tt`);
}
const searchSelector = {
  title: '.ipc-page-section > div > .ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > .ipc-metadata-list-summary-item__t',
  image: '.ipc-page-section > div > .ipc-metadata-list > .ipc-metadata-list-summary-item > div > .ipc-media > .ipc-image'
};

const limit = 100;
const searchLimit = 20;
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
    let returnData = {};
    console.log(data);
    switch (data) {
      case "home":
        returnData = {
          trending: [],
          favorites: []
        };
        await page.goto(homeURL);
        await page.waitForSelector(trendingSelector.title , {
          visible: true,
        })
        const tTitles = await page.$$eval(trendingSelector.title , el => el.map( e => e.textContent.slice(e.textContent.indexOf(' ')+1)));
        const tImages = await page.$$eval(trendingSelector.image , el => el.map( e => e.src ));
        const fTitles = await page.$$eval(favoriteSelector.title , el => el.map( e => e.textContent));
        const fImages = await page.$$eval(favoriteSelector.image , el => el.map( e => e.src));
        for ( i in tTitles)
          returnData.trending.push({id: i,title: tTitles[i], image: tImages[i]});
        for ( i in fTitles)
          returnData.favorites.push({id: i,title: fTitles[i], image: fImages[i]});
        page.close();
        break;
      case "movies":
        returnData = {
          movies: []
        }
        await page.goto(moviesURL);
        await page.waitForSelector( moviesSelector.image, {
          visible: true,
        });
        const mTitles = await page.$$eval(moviesSelector.title , el => el.map( e => e.textContent.slice(e.textContent.indexOf(' ')+1)));
        const mImages = await page.$$eval(moviesSelector.image , el => el.map( e => e.src ));
        for (i = 0; i < 100; ++i)
          returnData.movies.push({id: i, title: mTitles[i], image: mImages[i]});
        page.close();
        break;
        case "tv-shows":
          returnData = {
            tvshows: []
          }
          await page.goto(tvshowsURL);
          await page.waitForSelector( moviesSelector.image, {
            visible: true,
          });
          const tvTitles = await page.$$eval(moviesSelector.title , el => el.map( e => e.textContent.slice(e.textContent.indexOf(' ')+1 )));
          const tvImages = await page.$$eval(moviesSelector.image , el => el.map( e => e.src ));
          for (i = 0; i < 100; ++i)
            returnData.tvshows.push({id: i, title: tvTitles[i], image: tvImages[i]});
          page.close();
          break;
      default:
        returnData = {
          search: [] 
        }
        let query = data.slice(1);
        await page.goto(searchURL(query));
        await page.waitForSelector( searchSelector.image, {
          visible: true
        });
        const sTitles = await page.$$eval(searchSelector.title , el => el.map( e => e.textContent));
        const sImages = await page.$$eval(searchSelector.image , el => el.map( e => e.src ));
        for ( i = 0; i < searchLimit; ++i )
          returnData.search.push({id: i, title: sTitles[i], image: sImages[i]});
        page.close();
        break;
    }
    return returnData; 
  } catch(err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

app.listen(3000);

