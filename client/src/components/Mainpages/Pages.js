import React, { useContext } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { Switch, Route } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import CreateMovie from "../createmovie/CreateMovie";
import Notfound from "../utility/Notfound";
import Category from "../category/Category";
import Home from "../Home/Home";
import MovieDetail from "../Movies/MovieDetail";
import Movies from "../Movies/Movies";

function Pages() {
  const state = useContext(GlobalState);
  const [islogged] = state.userAPI.islogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      {/* Home page */}
      <Route path="/" exact component={Home} />
      {/* Movie Details */}
      <Route path="/detail/:id" exact component={MovieDetail} />

      {/* Movie path */}
      <Route path="/movies" exact component={Movies} />

      {/* Login path */}
      <Route path="/login" exact component={islogged ? Notfound : Login} />
      {/* Register path */}
      <Route
        path="/register"
        exact
        component={islogged ? Notfound : Register}
      />
       {/* categories */}
       <Route path="/category" exact component={isAdmin ? Category : Notfound} />

      {/* Create Movie */}
      <Route
        path="/create_movie"
        exact
        component={isAdmin ? CreateMovie : Notfound}
      />
     
      {/* edit movies */}
      <Route path="/edit_movie/:id" exact component={CreateMovie} />
      {/* 404 page */}
      <Route path="*" exact component={Notfound}></Route>
    </Switch>
  );
}

export default Pages;
