import Rating from "../rating/Rating";
import "./Grid.css";


export default function Grid({ items, modify }) {
  return (
    <div className="grid">
      {items && items.map( (item) => {
        return (
          <div className="grid-item" key={item.id}>
            <a onClick={()=> {modify(item)}} className="bookmark-button">
              <img src={localStorage.getItem(item.id) ? "bookmark-checked.svg" : "bookmark-unchecked.svg"} />
            </a>
            <img src={item.image}/>
            <Rating rating={item.rating}></Rating>
            <p className="grid-title">{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}
