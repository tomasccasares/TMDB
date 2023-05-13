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
      .get(`/api/tv/favorites/${user.id}`)
      .then((res) => res.data)
      .then((favorites) => {
        setFavorites(favorites);
      });
  }, [favorites]);
  const removeFromFavorite = (tvId) => {
    axios
      .delete(`/api/tv/favorites/${tvId}`)
      .then(alert("Removed from favorites"));
  };
  const dataTv = (id) => {
    user ? navigate(`/tv/details/${id}`) : navigate("/loggin");
  };
  return (
    <div>
      <Navbar />
      <div className="dis">
        {favorites.map((tv) => {
          return (
            <div
              key={tv.id}
              className="card"
              style={{ width: "20rem", margin: "10px", height: "65vh" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w400/${tv.poster_path}`}
                class="card-img-top"
                alt="..."
              ></img>
              <div className="card-body">
                <h4 className="card-title">{tv.title}</h4>
                <button
                  type="button"
                  className="btn btn-outline-info C"
                  onClick={() => dataTv(tv.tvId)}
                >
                  More Details
                </button>
                <button
                  type="button"
                  className="btn btn-outline-info C"
                  onClick={() => removeFromFavorite(tv.id)}
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
