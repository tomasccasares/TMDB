import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

export const Users = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/user/")
      .then((result) => result.data)
      .then((users) => setUsers(users))
      .catch((error) => console.log(error));
  }, []);

  const dataUser = (userId) => {
    navigate(`/user/details/${userId}`)
  }

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center", color: "white", fontSize: "80px" }}>
        USERS   
      </h1>
      <div className="dis">
        {users.map((user, i) => {
          return (
            <div
              key={user.id}
              className="card"
              style={{ width: "20rem", margin: "10px", height: "50vh" }}
            >
              <h1>{user.fullName}</h1>
              <img
                src={user.imgURL}
                class="card-img-top"
                alt="..."
              ></img>
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-outline-info C"
                  onClick={() => dataUser(user.id)}
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
