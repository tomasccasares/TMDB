import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Details } from "@mui/icons-material";

const Navbar = ({ inputValues }) => {
  //const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("user");
    navigate("/loggin");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children:
        name?.split(" ")[0] && name?.split(" ")[1]
          ? `${name?.split(" ")[0][0]}${name.split(" ")[1][0]}`
          : null,
    };
  }

  const userDetails = () => {
    navigate(`/user/details/${userState?.id}`);
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        {userState?.id ? (
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <Avatar
              {...stringAvatar(userState.fullName)}
              onClick={() => userDetails()}
              style={{ cursor: "pointer" }}
            />
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/users">
                    Users
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/movie">
                    Movies
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/tv">
                    Tv
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/movie/favorites">
                    Movie Favorites
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/tv/favorites">
                    Tv Favorites
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/" onClick={logoutUser}>
                    Logout
                  </a>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search Movie"
                  aria-label="Search"
                  name="movie"
                  onChange={inputValues}
                ></input>
              </form>
            </div>
          </div>
        ) : (
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/loggin">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};
export default Navbar;
