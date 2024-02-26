import { useEffect, useState } from 'react';

export default function Grid() {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    async function initialScrape() {
      const res = await fetch("http://localhost:3000/", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: "Test"})
      });
      const data = await res.json();
      if (data.data.length > 0) {
        setTrending(data.data);
      }
    }
    initialScrape();
  }, [])
  return (
    <>
      {trending.map( (x) => {
        return (
          <div key={x.id}>
            <img src={x.image}/>
            <p>{x.title}</p>
          </div>
        )
      })}
    </>
  )
}
