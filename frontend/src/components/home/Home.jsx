import { useEffect, useState } from 'react';
import Grid from '../grid/Grid.jsx';
import "./Home.css";

export default function Home({data, modify}) {
  return (
    <div className="home">
      <h2 className="home-top">Top 10 Trending</h2>
      <Grid modify={modify} items={data.trending}></Grid>
      <h2 className="home-favorites">Favorites</h2>
      <Grid modify={modify} items={data.favorites}></Grid>
    </div>
  )
}
