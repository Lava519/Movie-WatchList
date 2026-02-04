import {useEffect} from 'react';
import Grid from "../grid/Grid.jsx";
import Loading from "../loading/Loading.jsx";
import "./SearchBox.css"

export default function SearchBox({modify, items, loading, hidden=true}) {
  useEffect(() => {
    console.log(items, loading, hidden);
  
  }, [items])
  
  return (
    <div className={`search-box ${hidden?"search-box-hidden":""}  ${loading?"search-box-loading":""}`}>
      {loading && <Loading child={true}></Loading>}
      {!hidden && !loading && <Grid modify={modify} dark={true} items={items}></Grid>}
    </div>
  )
}
