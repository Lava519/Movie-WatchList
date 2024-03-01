import { useEffect, useState } from 'react'
import Nav from './components/nav/Nav.jsx';
import Home from './components/home/Home.jsx';
import Loading from './components/loading/Loading.jsx';
import Grid from './components/grid/Grid.jsx';
import './App.css'

function App() {
  const [scrapeData, setScrapeData] = useState({});
  const [name, setName] = useState("home");
  const [isScraping, setIsScraping] = useState(true);
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
  if ((name == "home" && !scrapeData.trending) || ( name == "movies" && !scrapeData.movies) || ( name == "tv-shows" && !scrapeData.tvshows ))
    initialScrape().then(()=>{setIsScraping(false)});
  }, [name])
  const navClick = (clickName) => {
    setName(clickName);
  }
  return (
    <>
      <Nav action={navClick} name={name}></Nav>
      <div className="non-nav">
        {isScraping && <Loading></Loading>}
        {!isScraping && name == "home" && <Home data={scrapeData} ></Home>}
        {!isScraping && name == "movies" && <Grid items={scrapeData.movies}></Grid>}
        {!isScraping && name == "tv-shows" && <Grid items={scrapeData.tvshows}></Grid>}
      </div>
    </>
  )
}

export default App
