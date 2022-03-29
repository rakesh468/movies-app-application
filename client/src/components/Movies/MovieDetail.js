import React,{ useContext, useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import { GlobalState } from '../../GlobalState';
import BasicRating from '../utility/BasicRating';
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@mui/material/Button";



function MovieDetail() {
    const state=useContext(GlobalState)
    const params = useParams();
    const [movies] = state.moviesAPI.movies;
    const [detailmovie, setdetailmovie] = useState([]);
    const history=useHistory();

    useEffect(() => {
        if (params.id) {
          movies.forEach((movie) => {
            if (movie._id === params.id) setdetailmovie(movie);
          });
        }
      }, [params.id, movies]);
      if (detailmovie.length === 0) return null;
    
  return (
    <div className="container">
      <iframe
        width="100%"
        height="600px"
        src={detailmovie.trailer}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="movie-detail-container">
        <div className="info-spec">
          <h6 className="movie-name">{detailmovie.title}</h6>
          <p>
            <BasicRating />
          </p>
        </div>
        <p className="summary">{detailmovie.summary}</p>
        <Button variant="contained" onClick={() => history.goBack("/movies")}>
          <KeyboardBackspaceIcon />
          Back
        </Button>
      </div>
    </div>

  )
}

export default MovieDetail