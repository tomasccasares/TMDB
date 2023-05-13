import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Movies = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState("");

  const inputValues = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=f0c9f0f256eb00c7cea7292bbca63678&language=en-US&query=${value}`
      )
      .then((res) => res.data.results)
      .then((movies) => setMovies(movies));
  }, [value]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=f0c9f0f256eb00c7cea7292bbca63678&language=en-US"
      )
      .then((res) => res.data.results)
      .then((movies) => setMovies(movies))
      .catch((error) => console.log(error));
  }, []);

  const dataMovie = (id) => {
    userState?.id ? navigate(`/movie/details/${id}`) : navigate("/loggin");
  };
  return (
    <div>
      <Navbar inputValues={inputValues} />
      <div className="dis">
        {movies.map((movie, i) => {
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
                <button
                  type="button"
                  className="btn btn-outline-info C"
                  onClick={() => dataMovie(movie.id)}
                >
                  More Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
