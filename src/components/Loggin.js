import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../state/users";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const Loggin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [props, setProps] = useState({
    email: "",
    password: "",
  });

  const inputValues = (e) => {
    const { name, value } = e.target;
    setProps({ ...props, [name]: value });
  };
  const formData = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", props)
      .then((res) => res.data)
      .then((dataUser) => {
        console.log('user: ', dataUser);
        dispatch(user(dataUser));
        localStorage.setItem("user", JSON.stringify(dataUser));
        navigate("/movie");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="center">
        <form onSubmit={formData}>
          <div class="mb-3">
            {/* <input
              type="email"
              class="form-control iLogin"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={inputValues}
            ></input> */}
            <Input
              type="email"
              name="email"
              placeholder="email"
              onChange={inputValues}
            />
          </div>
          <div class="mb-3">
            {/* <input
              type="password"
              class="form-control iLogin"
              id="exampleInputPassword1"
              name="password"
              onChange={inputValues}
              inputValues
            ></input> */}
            <Input
              name="password"
              placeholder="password"
              onChange={inputValues}
            />
          </div>
          {/* <input type="submit"></input> */}
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Loggin;

// tema de las cookies y una vez logueado redireccionar al sitio de peliculas(que sea otro componente)
// consumir la api desde el componente de peliculas
