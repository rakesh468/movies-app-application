import { useState, useEffect } from "react";
import axios from "axios";

function MoviesAPI() {
  const [movies, setmovies] = useState([]);
  const [callback, setcallback] = useState(false);
  const [category, setcategory] = useState("");
  const [sort, setsort] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [result, setresult] = useState(0);

  useEffect(() => {
    const getmovies = async () => {
      const res = await axios.get(
        `/api/movies?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`
      );
      setmovies(res.data.movies);
      setresult(res.data.result);
      console.log(res)
    };
    getmovies();
  }, [callback, category, sort, search, page]);
  return {
    movies: [movies, setmovies],
    callback: [callback, setcallback],
    category: [category, setcategory],
    sort: [sort, setsort],
    search: [search, setsearch],
    page: [page, setpage],
    result: [result, setresult],
  };
}

export default MoviesAPI;
