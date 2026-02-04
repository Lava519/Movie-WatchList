import Grid from "../grid/Grid.jsx";
import Loading from "../loading/Loading.jsx";

export default function SearchBox(modify, items, loading, hidden=true) {
  return (
    <div className={`search-box ${hidden && "search-box-hidden"}`}>
      {loading && <Loading></Loading>}
      {(!hidden && !loading) && <Grid modify={modify} dark={true} items={hidden ? items : null}></Grid>}
    </div>
  )
}
