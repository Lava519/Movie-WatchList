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
      <img onClick={()=>{setToggle(image)}} className={`${image == toggle && "active"}`} src={`${"../../../public/"}${image}${".svg"}`}></img>
    </div>
  )
}

export default function AdvancedSearch() {
  const [tSearch, setTSearch] = useState("movies");
  const setToggle = (name)=> {
    setTSearch(name)
  }
  return (
    <div className="asearch-container">
      <div className="asearch">
        <input className="search" type="text"/>
        <div className="abuttons-container">
          <SearchButton image="movies" toggle={tSearch} setToggle={setToggle}></SearchButton>
          <SearchButton image="person" toggle={tSearch} setToggle={setToggle}></SearchButton>
          <SearchButton image="tv-shows" toggle={tSearch} setToggle={setToggle}></SearchButton>
        </div>
      </div>
    </div>
  )
}
