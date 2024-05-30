const URL = 'https://www.imdb.com';
const TRENDING = { title: '.top-ten > div > div > div > div > .ipc-poster-card > .ipc-poster-card__title > span', image: '.top-ten > div > div > div > div > .ipc-poster-card > .ipc-poster > .ipc-media > .ipc-image' }
const FAVORITES = { title: '.fan-picks > div > div > div > div > .ipc-poster-card > .ipc-poster-card__title > span', image: '.fan-picks > div > div > div > div > .ipc-poster-card > .ipc-poster > .ipc-media > .ipc-image' }

const home = async (page) => {
  let returnData = {
    trending: [],
    favorites: []
  };
  await page.goto(URL);
  await page.waitForNetworkIdle();
  const tTitles = await page.$$eval(TRENDING.title, el => el.map(e => e.textContent.slice(e.textContent.indexOf(' ') + 1)));
  const tImages = await page.$$eval(TRENDING.image, el => el.map(e => e.src));
  const fTitles = await page.$$eval(FAVORITES.title, el => el.map(e => e.textContent));
  const fImages = await page.$$eval(FAVORITES.image, el => el.map(e => e.src));
  for (i in tTitles)
    returnData.trending.push({ id: i, title: tTitles[i], image: tImages[i] });
  for (i in fTitles)
    returnData.favorites.push({ id: i, title: fTitles[i], image: fImages[i] });
  page.close();
  return returnData;
}

module.exports = {
  home,
}