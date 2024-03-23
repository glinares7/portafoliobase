import React, { useState } from "react";
import { useDispatch } from "react-redux";

import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";

import { googleLogin, emailAndPasswordLogin } from "../actions/auth";

const LoginScreen = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = data;

  const handleChange = (e) => {
    const value = e.target.value;

    setData({
      ...data,
      [e.target.name]: value,
    });
    // console.log(value);
  };

  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || !email.trim().includes("@")) {
      return;
    }

    if (password.trim().length < 6) {
      return;
    }

    dispatch(emailAndPasswordLogin(email, password));
  };
  return (
    <div className="container">
      <h3>Login </h3>
      <hr />

      <div className="row container">
        <form onSubmit={handleEmailLogin} className="col-s12 ">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input
                onChange={handleChange}
                value={email}
                name="email"
                id="icon_prefix"
                className="materialize-text-area"
                type="text"
              />
              <label htmlFor="icon_prefix">Email</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">vpn_key</i>
              <input
                onChange={handleChange}
                value={password}
                name="password"
                id="icon_prefix2"
                className="materialize-text-area"
                type="password"
              />
              <label htmlFor="icon_prefix2">password</label>
            </div>
          </div>
          <button className="btn  waves-effect waves-light" type="submit">
            Enviar
          </button>
          <hr />
          <GoogleButton onClick={handleGoogleLogin} />
          <Link to="/auth/register">Register in the patforn</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
