import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/user/${id}`)
      .then((res) => res.data)
      .then((user) => setUser(user))
      .catch((error) => console.log(error));

    axios
      .get(`/api/user/favorites/${id}`)
      .then((res) => res.data)
      .then((userFavs) => setUserFavorites(userFavs))
      .catch((error) => console.log(error));
  }, []);

  const backToMovies = () => {
    navigate("/movie");
  };

  const dataMovie = (id) => {
    navigate(`/movie/details/${id}`);
  };

  return (
    <div className="divEx">
      <Navbar />
      <h1 style={{ textAlign: "center", color: "white" }}>{user.fullName}</h1>
      <div className="divIn">
        <img src={user.imgURL} alt="image"></img>
        <h1 style={{ color: "white" }}>FAVORITES MOVIES</h1>
        <div className="dis">
          {userFavorites.map((favorite, i) => {
            return (
              <div
                key={favorite.id}
                className="card"
                style={{ width: "20rem", margin: "10px", height: "65vh" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w400/${favorite.poster_path}`}
                  class="card-img-top"
                  alt="..."
                ></img>
                <div className="card-body">
                  <button
                    type="button"
                    className="btn btn-outline-info C"
                    onClick={() => dataMovie(favorite.id)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          class="btn btn-outline-info C"
          onClick={backToMovies}
        >
          Back to movies
        </button>
      </div>
    </div>
  );
};
