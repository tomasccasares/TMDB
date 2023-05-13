import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";

const Details = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=f0c9f0f256eb00c7cea7292bbca63678&language=en-US`
      )
      .then((res) => res.data)
      .then((movie) => setMovie(movie));
  }, []);
  const backToMovies = () => {
    navigate("/movie");
  };
  const addToFav = () => {
    axios
      .post(`/api/movie/favorites/${user.id}`, movie)
      .then(alert("Added to favorites"))
      .catch((error) => console.log(error));
  };
  return (
    <div className="divEx">
      <Navbar />
      <h1 style={{ textAlign: "center" }}>{movie.title?.toUpperCase()}</h1>
      <div className="divIn">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="image"
        ></img>
        <p style={{ textAlign: "center" }}>{movie.overview}</p>
        <button
          type="button"
          class="btn btn-outline-info C"
          onClick={backToMovies}
        >
          Back to movies
        </button>
        <button type="button" class="btn btn-outline-info C" onClick={addToFav}>
          Add to favorites
        </button>
      </div>
    </div>
  );
};
export default Details;
