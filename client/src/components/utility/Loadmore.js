import React,{useContext} from 'react'
import Button from "@mui/material/Button";
import { GlobalState } from '../../GlobalState';
import "./Loadmore.css";

function Loadmore() {
    const state=useContext(GlobalState)
    const [page, setpage] = state.moviesAPI.page;
    const [result] = state.moviesAPI.result;
  return (
    <div className="load_more">
    {result < page * 9 ? (
      ""
    ) : (
      <Button
        size="medium"
        color="inherit"
        variant="contained"
        onClick={() => setpage(page + 1)}
        className="load_button"
      >
        Loadmore
      </Button>
    )}
  </div>
  )
}

export default Loadmore