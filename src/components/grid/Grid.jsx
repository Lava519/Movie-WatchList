import { useEffect, useState } from 'react';

export default function Grid({ items }) {
  return (
    <div>
      {items && items.map( (item) => {
        return (
          <div key={item.id}>
            <img src={item.image}/>
            <p>{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}
