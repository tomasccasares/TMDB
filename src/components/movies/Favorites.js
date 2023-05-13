import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Favorites = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/movie/favorites/${user.id}`)
      .then((res) => res.data)
      .then((favorites) => {
        setFavorites(favorites);
      });
  }, [favorites]);
  const removeFromFavorite = (movieId) => {
    axios
      .delete(`/api/movie/favorites/${movieId}`)
      .then(alert("Removed from favorites"));
  };
  const dataMovie = (id) => {
    user ? navigate(`/movie/details/${id}`) : navigate("/loggin");
  };
  return (
    <div>
      <Navbar />
      <div className="dis">
        {favorites.map((movie) => {
          return (
            <div
              key={movie.id}
              className="card"
              style={{ width: "20rem", margin: "10px", height: "65vh" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                class="card-img-top"
                alt="..."
              ></img>
              <div className="card-body">
                <h4 className="card-title">{movie.title}</h4>
                <button
                  type="button"
                  className="btn btn-outline-info C"
                  onClick={() => dataMovie(movie.movieId)}
                >
                  More Details
                </button>
                <button
                  type="button"
                  className="btn btn-outline-info C"
                  onClick={() => removeFromFavorite(movie.id)}
                >
                  Remove from favorites
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Favorites;
