import React, { useContext, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "./Movies.css";
import Filter from "../utility/Filter";
import MovieItem from "../MovieItem/MovieItem";
import { GlobalState } from "../../GlobalState";
import Loadmore from "../utility/Loadmore";

function Movies() {
  const state = useContext(GlobalState);
  const [movies, setmovies] = state.moviesAPI.movies;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setcallback] = state.moviesAPI.callback;
  const [ischeck, setischeck] = useState(false);

  const handlecheck = (id) => {
    movies.forEach((movie) => {
      if (movie._id === id) movie.checked = !movie.checked;
    });
    setmovies([...movies]);
  };

  const deleteMovie = async (id, public_id) => {
    console.log({ id, public_id });

    try {
      const destoryimage = axios.post(
        "/api/destory",
        { public_id },
        { headers: { Authorization: token } }
      );
      const deleteMovie = axios.delete(`/api/movies/${id}`, {
        headers: { Authorization: token },
      });

      await destoryimage;
      await deleteMovie;
      setcallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const checkall = () => {
    movies.forEach((movie) => {
      movie.checked = !movie.checked;
    });
    setmovies([...movies]);
    setischeck(!ischeck);
  };

  const deleteall = () => {
    movies.forEach((movie) => {
      if (movie.checked) deleteMovie(movie._id, movie.images.public_id);
    });
  };

  return (
    <>
      <Filter />
      {isAdmin && 
        <div className="delete-all">
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={deleteall}
          >
            Delete All
          </Button>
          <span>
            <b>Select All</b>
          </span>
          <input type="checkbox" checked={ischeck} onChange={checkall} />
        </div>
      }
      <div className="movies">
        {movies.map((movie) => {
          return (
            <MovieItem
              key={movie._id}
              movie={movie}
              isAdmin={isAdmin}
              deleteMovie={deleteMovie}
              handlecheck={handlecheck}
            />
          );
        })}
      </div>
      <Loadmore />
    </>
  );
}

export default Movies;
