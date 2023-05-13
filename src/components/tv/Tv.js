import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Tv = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [tv, setTv] = useState([]);
  const [value, setValue] = useState("");
  const inputValues = (e) => {
    const { value } = e.target;
    setValue(value);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=f0c9f0f256eb00c7cea7292bbca63678&language=en-US&query=${value}`
      )
      .then((res) => res.data.results)
      .then((Tv) => setTv(Tv));
  }, [value]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/popular?api_key=f0c9f0f256eb00c7cea7292bbca63678&language=en-US&page=1"
      )
      .then((res) => res.data.results)
      .then((tvs) => setTv(tvs))
      .catch((error) => console.log(error));
  }, []);

  const dataTv = (id) => {
    user ? navigate(`/tv/details/${id}`) : navigate("/loggin");
  };
  return (
    <div>
      <Navbar inputValues={inputValues} />
      <div className="dis">
        {tv.map((tv, i) => {
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
                <button
                  type="button"
                  className="btn btn-outline-info C"
                  onClick={() => dataTv(tv.id)}
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

export default Tv;
