const URL = 'https://www.imdb.com/chart/toptv/';
const TVSHOWS = {
    title: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > div > .ipc-title > .ipc-title-link-wrapper > h3',
    image: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > .ipc-poster > .ipc-media > .ipc-image'
};


const tvshows = async (page) => {
    let returnData = {
        tvshows: []
    }
    await page.goto(URL);
    await page.waitForNetworkIdle();
    const tvTitles = await page.$$eval(TVSHOWS.title, el => el.map(e => e.textContent.slice(e.textContent.indexOf(' ') + 1)));
    const tvImages = await page.$$eval(TVSHOWS.image, el => el.map(e => e.src));
    for (i = 0; i < 100; ++i)
        returnData.tvshows.push({ id: i, title: tvTitles[i], image: tvImages[i] });
    page.close();
    return returnData;
}

module.exports = {
    tvshows,
}