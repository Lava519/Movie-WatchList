const URL = 'https://www.imdb.com/chart/top/';
const MOVIES = {
    title: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > div > .ipc-title > .ipc-title-link-wrapper > h3',
    image: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > .ipc-poster > .ipc-media > .ipc-image'
};

const movies = async (page) => {
    let returnData = {
        movies: []
    }
    await page.goto(URL);
    await page.waitForNetworkIdle();
    const mTitles = await page.$$eval(MOVIES.title, el => el.map(e => e.textContent.slice(e.textContent.indexOf(' ') + 1)));
    const mImages = await page.$$eval(MOVIES.image, el => el.map(e => e.src));
    for (i = 0; i < 100; ++i)
        returnData.movies.push({ id: i, title: mTitles[i], image: mImages[i] });
    page.close();
    return returnData
}

module.exports = {
    movies,
}