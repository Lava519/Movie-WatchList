const URL = 'https://www.imdb.com/chart/top/';
const MOVIES = {
    title: 'div > div > div > .ipc-title > .ipc-title-link-wrapper > h3',
    image: 'div > .ipc-poster > .ipc-media > .ipc-image',
    url: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > .ipc-poster > a',
    rating: 'div > div > div > span > div > span > .ipc-rating-star--rating'
};

const movies = async (page) => {
    let returnData = {
        movies: []
    }
    await page.goto(URL);
    await page.waitForNetworkIdle();
    const mTitles = await page.$$eval(MOVIES.title, el => el.map(e => e.textContent));
    const mImages = await page.$$eval(MOVIES.image, el => el.map(e => e.src.slice(0, e.src.lastIndexOf('_V1'))+"jpg"));
    const mURL = await page.$$eval(MOVIES.url, el => el.map(e => e.href.split('/')[e.href.split('/').length - 2]));
    const mRating = await page.$$eval(MOVIES.rating, el => el.map(e => e.textContent.slice(0, 3)));
    for (i = 0; i < 100; ++i)
        returnData.movies.push({ id: mURL[i], title: mTitles[i], image: mImages[i], rating: mRating[i]});
    page.close();
    return returnData
}

module.exports = {
    movies,
}
