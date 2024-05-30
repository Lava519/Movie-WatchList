# Movie Watchlist
## Preview
### Scrape and preview content from IMDb
![](docs/0.gif)
### Search and save
![](docs/1.gif)
## Installation
1. Open terminal and type following commands:\
    `git clone https://github.com/Lava519/Movie-WatchList.git`\
    `cd Movie-WatchList`\
    `npm install`\
    `cd scraper`\
    `npm install`
3. From `scraper` directory run `npm run start`.
4. From `Movie-WatchList` directory run `npm run dev`.
5. Go to `http://localhost:5173/` to preview site.
## Running with docker
1. Run from terminal:\
    `git clone https://github.com/Lava519/Movie-WatchList.git`\
    `cd Movie-WatchList`\
2. Run with docker:\
    `docker compose up`\
    or\
    `docker compose up --watch` for automatic updates when editing
