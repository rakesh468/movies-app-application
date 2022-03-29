import React,{ useContext } from 'react'
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import { GlobalState } from '../../GlobalState';
import CardActions from "@mui/material/CardActions";
import "./Btnrender.css";


function Btnrender({ movie ,deleteMovie }) {
    const state=useContext(GlobalState)

    const [isAdmin] = state.userAPI.isAdmin;

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <CardActions>
            <Button variant="contained" size="medium" color="primary">
              <Link id="btn_buy" to={`edit_movie/${movie._id}`}>
                {" "}
                EDIT
              </Link>
            </Button>
            <Button variant="contained" size="medium" color="error">
              <Link
                id="btn_buy"
                to="#!"
                onClick={() => deleteMovie(movie._id, movie.images.public_id)}
              >
                {" "}
                DELETE
              </Link>
            </Button>
          </CardActions>
        </>
      ) : (
        <>
          {/* <CardActions>
            <Button
              variant="contained"
              size="medium"
              color="primary"
             
            >
              {" "}
              <Link id="btn_view" to={`/detail/${movie._id}`}>
                View
              </Link>
            </Button>
          </CardActions> */}
        </>
      )}
    </div>
  )
}

export default Btnrender