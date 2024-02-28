import { useEffect, useState } from 'react'
import Nav from './components/nav/Nav.jsx';
import Grid from './components/grid/Grid.jsx';
import Home from './components/home/Home.jsx';
import Loading from './components/loading/Loading.jsx';
import './App.css'

function App() {
  const [scrapeData, setScrapeData] = useState({});
  const [name, setName] = useState("home");
  const [isScraping, setIsScraping] = useState(true);
  useEffect(() => {
    setIsScraping(true);
    async function initialScrape() {
      const res = await fetch("http://localhost:3000/", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: name})
      });
      const data = await res.json();
      if (data.data.trending.length > 0) {
        console.log(data)
        setScrapeData(data.data);
        setIsScraping(false);
      }
    }
  initialScrape();
  }, [name])
  const navClick = (clickName) => {
    setName(clickName);
  }
  return (
    <>
      <Nav action={navClick} name={name}></Nav>
      <div className="non-nav">
        {isScraping && <Loading></Loading>}
        {!isScraping && <Home data={scrapeData} ></Home>}
      </div>
    </>
  )
}

export default App
