import {useState} from "react";
import "./AdvancedSearch.css";

function SearchSelectButtons() {
  const [setTSearch, tSearch] = useState("movies");
  return (
    <div>
      
    </div>
  )
}

function SearchButton(image, isToggled, toggle) {

  return (
    <div onClick={toggle}>
      <img src={`${"../../../public/"}${image}${".svg"}`}></img>
    </div>
  )
}

export default function AdvancedSearch() {
  return (
    <div className="asearch-container">
      <div className="asearch">
        <input className="search" type="text"/>
      </div>
    </div>
  )
}
