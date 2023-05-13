import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";

const Details = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const navigate = useNavigate();
  const [tv, setTv] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=f0c9f0f256eb00c7cea7292bbca63678&language=en-US`
      )
      .then((res) => res.data)
      .then((tv) => setTv(tv));
  }, []);
  const backToTv = () => {
    navigate("/tv");
  };
  const addToFav = () => {
    axios
      .post(`/api/tv/favorites/${user.id}`, tv)
      .then(alert("Added to favorites"))
      .catch((error) => console.log(error));
  };
  return (
    <div className="divEx">
      <Navbar />
      <h1 style={{ textAlign: "center" }}>{tv.name?.toUpperCase()}</h1>
      <div className="divIn">
        <img
          src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
          alt="image"
        ></img>
        <p style={{ textAlign: "center" }}>{tv.overview}</p>
        <button type="button" class="btn btn-outline-info C" onClick={backToTv}>
          Back to tv
        </button>
        <button type="button" class="btn btn-outline-info C" onClick={addToFav}>
          Add to favorites
        </button>
      </div>
    </div>
  );
};
export default Details;
