import React, { useEffect, useState } from "react";
import "./Player.css"
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { Navigate, useNavigate, useParams } from "react-router-dom";


const Player = () => {

  const navigate =useNavigate();
  const {id}=useParams();

const [apiData, setApiData] = useState({
  name:"",
  key:"",
  published_at:"",
  typeof:""
});


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWFkNGRmMGViMDc0ZjhlMTA1NjJiZmYxYmVhMWY0NCIsIm5iZiI6MTcyNDk1MjE0OC41MTMwNTgsInN1YiI6IjY2ZDBhYjc5NmRmMzFjZGNhMzMwMzc4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ruwW37cA7HkQZgv2fF68IWHTcVSIwXLwyTFr23aEx68'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])
  
  

  return <div className="player">
    <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
    <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}title="trailer" allowFullScreen frameborder="0"></iframe>
<div className="player-info">
  <p>{apiData.published_at.slice(0,10)}</p>
  <p>{apiData.name}</p>
  <p>{apiData.type}</p>
</div>
  </div>;
};

export default Player;
