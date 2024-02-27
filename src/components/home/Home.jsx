import { useEffect, useState } from 'react';
import Grid from '../grid/Grid.jsx';

export default function Home({data}) {
  return (
    <>
      <h2>Top 10 Trending</h2>
      <Grid items={data.trending}></Grid>
      <h2>Favorites</h2>
      <Grid items={data.favorites}></Grid>
    </>
  )
}
