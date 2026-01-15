const URL = 'https://www.imdb.com/chart/toptv/';
const TVSHOWS = {
    title: 'div > div > div > .ipc-title > .ipc-title-link-wrapper > h3',
    image: 'div > .ipc-poster > .ipc-media > .ipc-image',
    url: 'div > div > div > .ipc-title > .ipc-title-link-wrapper',
    rating: 'div > div > div > span > div > span > .ipc-rating-star--rating'
};


const tvshows = async (page) => {
    let returnData = {
        tvshows: []
    }
    await page.goto(URL);
    await page.waitForNetworkIdle();
    const tvTitles = await page.$$eval(TVSHOWS.title, el => el.map(e => e.textContent.slice(e.textContent.indexOf(' ') + 1)));
    const tvImages = await page.$$eval(TVSHOWS.image, el => el.map(e => e.src.slice(0, e.src.lastIndexOf('_V1'))+"jpg"));
    const tvURL = await page.$$eval(TVSHOWS.url, el => el.map(e => e.href.split('/')[e.href.split('/').length - 2]));
    const tvRating = await page.$$eval(TVSHOWS.rating, el => el.map(e => e.textContent.slice(0, 3)));
    for (i = 0; i < 100; ++i)
        returnData.tvshows.push({ id: tvURL[i], title: tvTitles[i], image: tvImages[i], rating: tvRating[i] });
    page.close();
    return returnData;
}

module.exports = {
    tvshows,
}
