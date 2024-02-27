import './Nav.css'

export default function Nav({action}) {
  return (
    <ul className="nav">
      <li onClick={()=>{action("home")}} id="home">Home</li>
      <li onClick={()=>{action("movies")}} id="movies">Movies</li>
      <li onClick={()=>{action("tv-shows")}} id="tv-shows">TV Shows</li>
      <li onClick={()=>{action("bookmarks")}} id="bookmarks">Bookmarks</li>
    </ul>
  )
}
