import { useEffect, useState } from 'react';
import "./Grid.css";

export default function Grid({ items }) {
  return (
    <div className="grid">
      {items && items.map( (item) => {
        return (
          <div className="grid-item" key={item.id}>
            <img src={item.image}/>
            <p>{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}
