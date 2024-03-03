import { useEffect, useState } from 'react';
import "./Grid.css";

export default function Grid({ items, add }) {
  return (
    <div className="grid">
      {items && items.map( (item) => {
        return (
          <div className="grid-item" key={item.id}>
            <a onClick={()=> {add(item)}} className="bookmark-button">
              <img src="bookmark-unchecked.svg" />
            </a>
            <img src={item.image}/>
            <p className="grid-title">{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}
