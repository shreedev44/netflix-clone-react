import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2QyYTU5NTVmNzRjZThiNjc1NDVkMjgxZGQ4ZjQ4OSIsIm5iZiI6MTcyNjYzMjkwNS4yMjM2MTUsInN1YiI6IjY2ZWE1MmNlYjI5MTdlYjE4MDBiM2ZkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L3nFa6aBXDzEGzkg8ddmSN5I2R0Q23aY9yqzNcGK4OA'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => {
        if (response && response.results) {
          setApiData(response.results);  // Update to 'results' based on the API structure
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list">
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
