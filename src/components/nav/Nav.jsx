import './Nav.css'

export default function Nav({action}) {
  return (
    <ul className="nav">
      <li id="logo"><img src="logo.svg"/></li>
      <li onClick={()=>{action("home")}} id="home"><img src="home.svg"/></li>
      <li onClick={()=>{action("movies")}} id="movies"><img src="movies.svg" /></li>
      <li onClick={()=>{action("tv-shows")}} id="tv-shows"><img src="tv-shows.svg" /></li>
      <li onClick={()=>{action("bookmarks")}} id="bookmarks"><img src="bookmarks.svg" /></li>
    </ul>
  )
}
