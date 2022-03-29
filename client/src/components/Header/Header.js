import React,{useContext} from 'react'
import { GlobalState } from '../../GlobalState'
import menu from "./icon/menu.svg";
import close from "./icon/close.svg";
import "./Header.css";
import {Link} from "react-router-dom";
import {useState} from"react";
import axios from 'axios';

function Header() {
  const state=useContext(GlobalState);
  const [islogged] = state.userAPI.islogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [Menu, setMenu] = useState(false);

  const logoutuser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstlogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_movie" className="Home">
            <b>Create Movie</b>
          </Link>
        </li>
        <li>
          <Link to="/category" className="Home">
            <b>Category</b>
          </Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/" onClick={logoutuser} className="Home">
            <b> Logout</b>
          </Link>
        </li>
      </>
    );
  };

  const stylemenu = {
    left: Menu ? 0 : "-100%",
  };

  return (
    <header>
    <div className="menu" onClick={() => setMenu(!Menu)}>
      <img src={menu} alt="menu-bar" width="30" />
    </div>
    <div className="logo">
      <h1>
        <Link to="/">
          {isAdmin ? (
            "Admin"
          ) : (
            <img
              src="https://download.logo.wine/logo/Netflix/Netflix-Logo.wine.png"
              className="Logo"
              alt="logo"
            />
          )}
        </Link>
      </h1>
    </div>

    <ul style={stylemenu}>
      <li>
        <h4>
          <Link to="/movies"> {isAdmin ? "Movies" : "Movies"} </Link>
        </h4>
      </li>
      {isAdmin && adminRouter()}
      {islogged ? (
        loggedRouter()
      ) : (
        <li>
          <Link to="/login">
            <h4>
              <b>Login</b>
            </h4>
          </Link>
        </li>
      )}
      <li onClick={() => setMenu(!Menu)}>
        {" "}
        <img src={close} alt="" width="30" className="menu" />
      </li>
    </ul>
  </header>
  )
}

export default Header