import {useState, useEffect} from "react";
import "./AdvancedSearch.css";
import SearchBox from '../searchBox/SearchBox.jsx'

function SearchButton({image, toggle, setToggle}) {
  return (
    <div onClick={()=>{setToggle(image)}} className="abutton" >
      <img className={`${image == toggle ? "active" : ""}`} src={`${"/"}${image}${".svg"}`}></img>
    </div>
  )
}

export default function AdvancedSearch({searchScrape}) {
  const [query, setQuery] = useState("");
  const [tSearch, setTSearch] = useState("general");
  const setToggle = (name)=> {
    setTSearch(name)
  }
  const handleSearchChange = (e) =>{
    setQuery(e.target.value);
  }
  return (
    <div className="asearch-container">
      <div className="asearch">
        <div className="asearch-h asearch-container">
          <input onChange={handleSearchChange} className="search" type="text"/>
          <div onClick={()=>{searchScrape(`:${tSearch[0]}${query}`)}}className="search search-icon">
            <img src="search.svg"/>
          </div>
        </div>
        <div className="abuttons-container">
          <SearchButton image="general" toggle={tSearch} setToggle={setToggle}></SearchButton>
          <SearchButton image="tv-shows" toggle={tSearch} setToggle={setToggle}></SearchButton>
          <SearchButton image="movies" toggle={tSearch} setToggle={setToggle}></SearchButton>
          {/*<SearchButton image="person" toggle={tSearch} setToggle={setToggle}></SearchButton>*/}
        </div>
      </div>
    </div>
  )
}
