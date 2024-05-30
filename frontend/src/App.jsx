import { useEffect, useState } from 'react'
import Nav from './components/nav/Nav.jsx';
import Home from './components/home/Home.jsx';
import Loading from './components/loading/Loading.jsx';
import Grid from './components/grid/Grid.jsx';
import Search from './components/search/Search.jsx';
import './App.css'

function App() {
  const isStorageEmpty = localStorage.length == 0;
  const initialBookmarkID = () => {
    if (!isStorageEmpty)
      return Number(localStorage.getItem('bID'));
    localStorage.setItem('bID', 0);
    return 0;
  }
  const initialBookmarks = () => {
    let temp = [];
    for (let key in {...localStorage}) {
      if(key != 'bID')
        temp.push(JSON.parse(localStorage.getItem(key)));
    }
    return temp;
  }

  const [scrapeData, setScrapeData] = useState({});
  const [name, setName] = useState("home");
  const [isScraping, setIsScraping] = useState(true);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchClass, setSearchClass] = useState("");
  const [bookmarkID, setBookmarkID] = useState(initialBookmarkID);
  const [bookmark, setBookmark] = useState(initialBookmarks);
  
  useEffect(() => {
    async function initialScrape() {
      setIsScraping(true);
      const res = await fetch("http://localhost:3000/", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: name})
      });
      const data = await res.json();
      setScrapeData({...scrapeData,...data.data,});
    }
  if ((name == "home" && !scrapeData.trending) || ( name == "movies" && !scrapeData.movies) || ( name == "tv-shows" && !scrapeData.tvshows || name[0] == ":" ))
    initialScrape().then(()=>{setIsScraping(false)});
  }, [name])

  const searchScrape = (query) => {
    setName(query);
    toggle();
  }

  const navClick = (clickName) => {
    setName(clickName);
  }

  const toggle = () => {
    if (searchToggle) {
      setSearchClass("dissapear");
      setTimeout(() => {
       setSearchToggle(false); 
      }, 500);
    } else {
      setSearchClass("");
      setSearchToggle(true);
    }
  }

  const modifyBookmark = (item) => {
    if (bookmark.filter((x) => x.title == item.title).length == 0) {
      setBookmark([...bookmark, {id: bookmarkID, title: item.title, image: item.image}]);
      localStorage.setItem(item.title, JSON.stringify({id: bookmarkID, title: item.title, image: item.image}));
      localStorage.setItem('bID', bookmarkID+1);
      setBookmarkID(bookmarkID+1);
    } else {
      setBookmark(bookmark.filter((x) => x.title != item.title));
      localStorage.removeItem(item.title);
    }
  }

  return (
    <>
      <Nav action={navClick} name={name} toggle={toggle}></Nav>
      <div className={`non-nav ${searchToggle ? "down" : ""}`}>
        {searchToggle && <Search animationClass={searchClass} searchScrape={searchScrape}></Search>}
        {isScraping && <Loading></Loading>}
        {!isScraping && name == "home" && <Home modify={modifyBookmark} data={scrapeData} ></Home>}
        {!isScraping && name[0] == ":" && <Grid modify={modifyBookmark} items={scrapeData.search}></Grid> }
        {!isScraping && name == "movies" && <Grid modify={modifyBookmark} items={scrapeData.movies}></Grid>}
        {!isScraping && name == "tv-shows" && <Grid modify={modifyBookmark} items={scrapeData.tvshows}></Grid>}
        {name == "bookmarks" && <Grid modify={modifyBookmark} items={bookmark}></Grid>} 
      </div>
    </>
  )
}

export default App
