import {useState, useEffect} from "react";
import "./AdvancedSearch.css";

function SearchSelectButtons() {
  return (
    <div>
      
    </div>
  )
}

function SearchButton({image, toggle, setToggle}) {
  return (
    <div className="abutton" >
      <img onClick={()=>{setToggle(image)}} className={`${image == toggle ? "active" : ""}`} src={`${"/"}${image}${".svg"}`}></img>
    </div>
  )
}

export default function AdvancedSearch({searchScrape}) {
  const [query, setQuery] = useState("");
  const [tSearch, setTSearch] = useState("movies");
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
          <div onClick={()=>{searchScrape(query)}}className="search search-icon">
            <img src="search.svg"/>
          </div>
        </div>
        <div className="abuttons-container">
          <SearchButton image="movies" toggle={tSearch} setToggle={setToggle}></SearchButton>
          <SearchButton image="person" toggle={tSearch} setToggle={setToggle}></SearchButton>
          <SearchButton image="tv-shows" toggle={tSearch} setToggle={setToggle}></SearchButton>
        </div>
      </div>
    </div>
  )
}
