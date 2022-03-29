import"./CreateMovie.css";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { useHistory, useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";


const initialstate = {
    movie_id:"",
    title:"",
    rating:"",
    summary:"",
    images:"",
    trailer:"",
    category:"",
    _id:""
  };

function CreateMovie() {
    const history = useHistory();
  const param = useParams();
  const state = useContext(GlobalState);
  const [movie, setmovie] = useState(initialstate);
  const [categories] = state.categoriesAPI.categories;
  const [images, setimages] = useState(false);
  const [token] = state.token;
  const [isAdmin] = state.userAPI.isAdmin;
  const [movies] = state.moviesAPI.movies;
  const [onedit, setonedit] = useState(false);
  const [callback, setcallback] = state.moviesAPI.callback;

  const styleupload = {
    display: images ? "block" : "none",
  };

  useEffect(() => {
    if (param.id) {
      setonedit(true);
      movies.forEach((movie) => {
        if (movie._id === param.id) {
          setmovie(movie);
          setimages(movie.images);
        }
      });
    } else {
      setonedit(false);
      setmovie(initialstate);
      setimages(false);
    }
  }, [param.id, movies]);


  const handleupload = async (event) => {
    event.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an Admin");

      const file = event.target.files[0];

      if (!file) return alert("file not Exist");

      if (file.size > 1024 * 1024) return alert("Size is not large");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File Format is incorrect");

      let formData = new FormData();
      formData.append("file", file);

      const result = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setimages(result.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handledestory = async () => {
    try {
      if (!isAdmin) return alert("You are not an Admin");
      await axios.post(
        "/api/destory",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );

      setimages(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handlechangeInput = (event) => {
    const { name, value } = event.target;
    setmovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isAdmin) return alert("you are not an admin");
      if (!images) return alert("No images uploaded");
      if (onedit) {
        await axios.put(
          `/api/movies/${movie._id}`,
          { ...movie, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/movies",
          { ...movie, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setcallback(!callback);

      history.push("/movies");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="create_movie">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleupload} />
        <div id="file_img" style={styleupload}>
          <img src={images ? images.url : ""} alt="" />
          <span onClick={handledestory}>X</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="movie_id">Movie Id:</label>
          <input
            type="text"
            id="movie_id"
            name="movie_id"
            required
            value={movie.movie_id}
            onChange={handlechangeInput}
            disabled={onedit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={movie.title}
            onChange={handlechangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="rating">Rating::</label>
          <input
            type="text"
            id="rating"
            name="rating"
            required
            value={movie.rating}
            onChange={handlechangeInput}
            
          />
        </div>
        <div className="row">
          <label htmlFor="summary">Summary:</label>
          <textarea
            type="text"
            id="summary"
            name="summary"
            required
            value={movie.summary}
            onChange={handlechangeInput}
            rows="4"
          />
        </div>
        <div className="row">
          <label htmlFor="trailer">Trailer:</label>
          <input
            type="text"
            id="trailer"
            name="trailer"
            required
            value={movie.trailer}
            onChange={handlechangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="category">Category: </label>

          <select
            name="category"
            value={movie.category}
            onChange={handlechangeInput}
          >
            <option value="">Please select Category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <CardActions>
          <Button variant="contained" size="small" type="submit">
            {onedit ? "update" : "Create"}
          </Button>
        </CardActions>
      </form>
    </div>
  );
  
}

export default CreateMovie