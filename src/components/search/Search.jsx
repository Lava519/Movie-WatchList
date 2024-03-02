import { useState } from 'react';
import "./Search.css";

export default function search({animationClass, searchScrape}) {
  const [query, setQuery] = useState("");
  const handleSearchChange = (e) => {
    setQuery(`:${e.target.value}`);
  }
  return (
    <div className={"search-container "+ animationClass }>
      <input onChange={handleSearchChange} className="search" type="text" />
      <div onClick={()=>{searchScrape(query)}} className="search-icon">
        <img src="search.svg" />
      </div>
    </div>  
  )
}

