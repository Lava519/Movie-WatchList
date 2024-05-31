const URL = 'https://www.imdb.com';
const FAVORITES_URL = 'https://www.imdb.com/what-to-watch/fan-favorites';
const TRENDING_URL = 'https://www.imdb.com/what-to-watch/popular';
const LIMIT = 10;
const TRENDING = { title: '.ipc-poster-card > .ipc-poster-card__title > span', image: '.ipc-poster-card > .ipc-poster > .ipc-media > .ipc-image', url: '.ipc-poster-card > .ipc-poster > a' };
const FAVORITES = { title: '.ipc-poster-card > .ipc-poster-card__title > span', image: '.ipc-poster-card > .ipc-poster > .ipc-media > .ipc-image', url: '.ipc-poster-card > .ipc-poster > a' };

const home = async (page) => {
  let returnData = {
    trending: [],
    favorites: []
  };
  await page.goto(FAVORITES_URL);
  await page.waitForNetworkIdle();
  const tTitles = await page.$$eval(TRENDING.title, el => el.map(e => e.textContent));
  const tImages = await page.$$eval(TRENDING.image, el => el.map(e => e.src));
  const tURL = await page.$$eval(TRENDING.url, el => el.map(e => e.href.split('/')[e.href.split('/').length - 2]));
  await page.goto(TRENDING_URL);
  await page.waitForNetworkIdle();
  const fTitles = await page.$$eval(FAVORITES.title, el => el.map(e => e.textContent));
  const fImages = await page.$$eval(FAVORITES.image, el => el.map(e => e.src));
  const fURL = await page.$$eval(FAVORITES.url, el => el.map(e => e.href.split('/')[e.href.split('/').length - 2]));
  for (i = 0; i < LIMIT; ++i)
    returnData.trending.push({ id: tURL[i], title: tTitles[i], image: tImages[i] });
  for (i in fTitles)
    returnData.favorites.push({ id: fURL[i], title: fTitles[i], image: fImages[i] });
  page.close();
  return returnData;
}

module.exports = {
  home,
}