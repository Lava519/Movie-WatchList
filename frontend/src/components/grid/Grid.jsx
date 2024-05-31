import { useEffect, useState } from 'react';
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
            <p className="grid-title">{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}
