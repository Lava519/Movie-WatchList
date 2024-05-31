const SEARCH = {
    title: '.ipc-page-section > div > .ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > .ipc-metadata-list-summary-item__t',
    image: '.ipc-page-section > div > .ipc-metadata-list > .ipc-metadata-list-summary-item > div > .ipc-media > :first-child',
    url: '.ipc-page-section > div > .ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > a'
};

const LIMIT = 20;

const RESIZE = {
    x: '_V1_QL75_UX140_CR0,1,140,207_.jpg',
    y: '_V1_QL75_UY207_CR4,0,140,207_.jpg'
};

const searchURL = (query) => {
    return (`https://www.imdb.com/find/?q=${query}&s=tt`);
}

const resizeImage = (imgLink) => {
    if (imgLink == undefined)
        return 'undefined.png';
    if (imgLink.slice(-20, -19) == 'X')
        return imgLink.slice(0, -30) + RESIZE.x;
    return imgLink.slice(0, -30) + RESIZE.y;
}

const search = async (page, data) => {
    let returnData = {
        search: []
    }
    let query = data.slice(1);
    await page.goto(searchURL(query));
    await page.waitForNetworkIdle();
    if (await page.$(SEARCH.title) == null)
        return {
            search: [{
                id: 0,
                title: "NOT FOUND",
                image: "undefined.png"
            }]
        }
    const sTitles = await page.$$eval(SEARCH.title, el => el.map(e => e.textContent));
    const sImages = await page.$$eval(SEARCH.image, el => el.map(e => e.src));
    const sURL = await page.$$eval(SEARCH.url, el => el.map(e => e.href.split('/')[e.href.split('/').length - 2]));
    for (i = 0; i < LIMIT; ++i)
        returnData.search.push({ id: sURL[i], title: sTitles[i], image: resizeImage(sImages[i]) });
    page.close();
    return returnData;
}

module.exports = {
    search,
}
