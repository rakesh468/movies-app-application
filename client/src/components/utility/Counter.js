import React from 'react'
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import CardActions from "@mui/material/CardActions";

function Counter() {
    const [like, setlike] = useState(0);
  const [dislike, setdislike] = useState(0);
  const incrementlike = () => setlike(like + 1);
  const decrementdislike = () => setdislike(dislike + 1);
  return (
    <div>
      <CardActions>
    <IconButton color="primary" aria-label="like" onClick={incrementlike}>
      <Badge badgeContent={like} color="primary">
        👍
      </Badge>
    </IconButton>
    <IconButton color="primary" aria-label="like" onClick={decrementdislike}>
      <Badge badgeContent={dislike} color="error">
        👎
      </Badge>
    </IconButton>
    </CardActions>
  </div>
  )
}

export default Counter