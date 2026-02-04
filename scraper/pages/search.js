const SEARCH = {
    title: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > div > div > div > .ipc-title > a > h3',
    image: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > div > div > div > div > .ipc-media > :first-child',
    url: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > div > div > div > .ipc-title > a',
    rating: '.ipc-metadata-list > .ipc-metadata-list-summary-item > div > div > div > div > div > span > div > .ipc-rating-star'
};

const LIMIT = 10;

const searchURL = (query) => {
    return (`https://www.imdb.com/search/title/?title=${query}`);
}

const filterUnique = (array) => {
    let temp = [];
    for (let i = 0; i < array.length; ++i) {
        let found = false
        for ( j in temp) {
            if (temp[j].id===array[i].id) {
                found = true
            }
        }
        if (!found)
            temp.push(array[i]);
    }
    return temp;
}

const checkImage = (imgLink) => {
    if (imgLink == undefined)
        return 'undefined.png';
    return imgLink;
}

const search = async (page, data) => {
    let returnData = {
        search: []
    }
    let query = data.slice(2);
    let category = data[1] 
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
    const sTitles = await page.$$eval(SEARCH.title, el => el.map(e => e.textContent.slice(e.textContent.indexOf(' '))));
    const sImages = await page.$$eval(SEARCH.image, el => el.map(e => {
        if(e.src)
            return e.src.slice(0, e.src.lastIndexOf('_V1'));
        return e.src;
    }));
    const sURL = await page.$$eval(SEARCH.url, el => el.map(e => e.href.split('/')[e.href.split('/').length - 2]));
    const sRating = await page.$$eval(SEARCH.rating, el => el.map(e => e.textContent.slice(0, 3)));
    for (i = 0; i < LIMIT; ++i)
        returnData.search.push({ id: sURL[i], title: sTitles[i], image: checkImage(sImages[i]), rating: sRating[i] });
    returnData.search = filterUnique(returnData.search);
    page.close();
    return returnData;
}

module.exports = {
    search,
}
