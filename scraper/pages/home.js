const URL = 'https://www.imdb.com';
const FAVORITES_URL = 'https://www.imdb.com/what-to-watch/fan-favorites';
const HOME_URL = 'https://www.imdb.com/what-to-watch/popular';
const LIMIT = 10;
const HOME = { title: '.ipc-poster-card > .ipc-poster-card__title > span',
  image: '.ipc-poster-card > .ipc-poster > .ipc-media > .ipc-image',
  url: '.ipc-poster-card > .ipc-poster > a',
  rating: '.ipc-poster-card > .ipc-rating-star-group > span'
};

const home = async (page) => {
  let returnData = {
    trending: [],
    favorites: []
  };
  await page.goto(HOME_URL);
  await page.waitForNetworkIdle();
  const tTitles = await page.$$eval(HOME.title, el => el.map(e => e.textContent));
  const tImages = await page.$$eval(HOME.image, el => el.map(e => e.src));
  const tURL = await page.$$eval(HOME.url, el => el.map(e => e.href.split('/')[e.href.split('/').length - 2]));
  const tRating = await page.$$eval(HOME.rating, el => el.map(e => e.textContent));
  await page.goto(FAVORITES_URL);
  await page.waitForNetworkIdle();
  const fTitles = await page.$$eval(HOME.title, el => el.map(e => e.textContent));
  const fImages = await page.$$eval(HOME.image, el => el.map(e => e.src));
  const fURL = await page.$$eval(HOME.url, el => el.map(e => e.href.split('/')[e.href.split('/').length - 2]));
  const fRating = await page.$$eval(HOME.rating, el => el.map(e => e.textContent));
  for (i = 0; i < LIMIT; ++i)
    returnData.trending.push({ id: tURL[i], title: tTitles[i], image: tImages[i], rating: tRating[i] });
  for (i in fTitles)
    returnData.favorites.push({ id: fURL[i], title: fTitles[i], image: fImages[i], rating: fRating[i] });
  page.close();
  return returnData;
}

module.exports = {
  home,
}