import "./Search.css"

export default function search({animationClass}) {
  return (
    <div className={"search-container "+ animationClass }>
      <input className="search" type="text" />
      <div className="search-icon">
        <img src="logo.svg"  />
      </div>
    </div>  
  )
}

