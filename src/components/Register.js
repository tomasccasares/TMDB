import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const ariaLabel = { "aria-label": "description" };

const Register = () => {
  const navigate = useNavigate();
  const [props, setProps] = useState({
    email: "",
    password: "",
    fullName: "",
    imgURL: "",
  });
  const inputValues = (e) => {
    const { name, value } = e.target;
    setProps({ ...props, [name]: value });
  };
  const formData = (e) => {
    e.preventDefault();
    axios.post("/api/user/register", props).then((user) => {
      if (!user.data) return;
      navigate("/loggin");
    });
  };
  return (
    <div>
      <form onSubmit={formData}>
        <div class="mb-3 row">
          <label htmlFor="email" class="col-sm-2 col-form-label">
            Email
          </label>
          <div class="col-sm-10">
            {/* <input
              type="text"
              name="email"
              class="form-control"
              onChange={inputValues}
            ></input> */}
            <Input name="email" placeholder="email" onChange={inputValues} />
          </div>
        </div>
        <div class="mb-3 row">
          <label htmlFor="password" class="col-sm-2 col-form-label">
            Password
          </label>
          <div class="col-sm-10">
            {/* <input
              type="password"
              name="password"
              class="form-control"
              onChange={inputValues}
            ></input> */}
            <Input
              name="password"
              placeholder="password"
              onChange={inputValues}
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label htmlFor="name" class="col-sm-2 col-form-label">
            Name and Lastname
          </label>
          <div class="col-sm-10">
            {/* <input
              type="text"
              name="fullName"
              class="form-control"
              onChange={inputValues}
            ></input> */}
            <Input
              name="fullName"
              placeholder="Fullname"
              onChange={inputValues}
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label htmlFor="name" class="col-sm-2 col-form-label">
            Image url
          </label>
          <div class="col-sm-10">
            {/* <input
              type="text"
              name="fullName"
              class="form-control"
              onChange={inputValues}
            ></input> */}
            <Input
              name="imgURL"
              placeholder="Image url"
              onChange={inputValues}
            />
          </div>
        </div>
        {/* <input type="submit"></input> */}
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Register;
