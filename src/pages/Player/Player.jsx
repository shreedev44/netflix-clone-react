import React, { useEffect, useState } from 'react'
import './Player.css'
import backArrowIcon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2QyYTU5NTVmNzRjZThiNjc1NDVkMjgxZGQ4ZjQ4OSIsIm5iZiI6MTcyNjYzMjkwNS4yMjM2MTUsInN1YiI6IjY2ZWE1MmNlYjI5MTdlYjE4MDBiM2ZkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L3nFa6aBXDzEGzkg8ddmSN5I2R0Q23aY9yqzNcGK4OA'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results[0]))
      .catch(err => console.error(err));
  }, [])

  return (
    <div className='player'>
      <img src={backArrowIcon} alt="" onClick={() => {navigate(-2)}} />
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' width={'90%'} height={'90%'} frameBorder={"0"} allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
