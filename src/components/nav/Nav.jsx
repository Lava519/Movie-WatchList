import './Nav.css'

export default function Nav({action, name, toggle}) {
  return (
    <ul className="nav">
      <li id="logo" onClick={toggle}><img src="logo-menu.svg"/></li>
      <li onClick={()=>{action("home")}} className={name=="home"? "active" : ""} id="home"><img src="home.svg"/></li>
      <li onClick={()=>{action("movies")}} className={name=="movies"? "active" : ""} id="movies"><img src="movies.svg" /></li>
      <li onClick={()=>{action("tv-shows")}} className={name=="tv-shows"? "active" : ""} id="tv-shows"><img src="tv-shows.svg" /></li>
      <li onClick={()=>{action("bookmarks")}} className={name=="bookmarks"? "active" : ""} id="bookmarks"><img src="bookmarks.svg" /></li>
    </ul>
  )
}
