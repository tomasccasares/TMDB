import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Loggin from "./components/Loggin";
import Movies from "./components/movies/Movies";
import MovieDetails from "./components/movies/Details";
import MovieFavorites from "./components/movies/Favorites";
import Tv from "./components/tv/Tv";
import TvDetails from "./components/tv/Details";
import TvFavorites from "./components/tv/Favorites";
import { useSelector } from "react-redux";
import { Users } from "./components/users/Users";
import { Details } from "./components/users/Details";

export const App = () => {
  const userState = useSelector((state) => state.user);
  //const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Movies />} />

        <Route path="/loggin" element={<Loggin />} />
        <Route path="/register" element={<Register />} />

        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route
          path="/movie/favorites"
          element={userState ? <MovieFavorites /> : <Loggin />}
        />

        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/details/:id" element={<TvDetails />} />
        <Route
          path="/tv/favorites"
          element={userState ? <TvFavorites /> : <Loggin />}
        />

        <Route path="/users" element={<Users />} />
        <Route
          path="/user/details/:id"
          element={userState ? <Details /> : <Loggin />}
        />
      </Routes>
    </div>
  );
};
