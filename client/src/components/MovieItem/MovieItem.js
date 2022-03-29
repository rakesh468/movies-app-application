import React from 'react';
import "./MovieItem.css";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import InfoIcon from "@mui/icons-material/Info";
import Btnrender from '../utility/Btnrender';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Counter from '../utility/Counter';


function MovieItem({movie, isAdmin, deleteMovie, handlecheck}) {
  const history = useHistory();
  
    const [show, setshow] = useState(true);
    const stylesummary = {
      display: show ? "block" : "none",
    };
    
  return (
    <Card className="main-container">
        {isAdmin && (
        <input
          type="checkbox"
          checked={movie.checked}
          onChange={() => handlecheck(movie._id)}
        />
        )}
      <img
        src={movie.images.url}
        alt={movie.title}
        className="image"
        onClick={()=>history.push(`/detail/${movie._id}`)}
      />
      <CardContent className="details">
        <div class="info-spec">
          <h6 className="movie-name">
            {movie.title}
            <IconButton
              onClick={() => setshow(!show)}
              color="primary"
              aria-label="summary"
            >
              {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <IconButton
              
              aria-label="info"
              color="primary"
            >
              <InfoIcon  onClick={()=>history.push(`/detail/${movie._id}`)}/>
            </IconButton>
          </h6>
          <p >⭐{movie.rating}</p>
        </div>
        <p style={stylesummary} className="movie-summary">
          {movie.summary}{" "}
        </p>
        <CardActions>
          <Counter/>
         
        </CardActions>
       
      </CardContent>
      <Btnrender movie={movie} deleteMovie={deleteMovie}/>
    </Card>
  )
}

export default MovieItem