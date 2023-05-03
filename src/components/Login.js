import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthToken, getAuthToken } from "../features/auth/authSlice";

export default function Login(props) {
  const token = useSelector(getAuthToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const doLogin = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const token = await response.json();
      dispatch(setAuthToken(token));
      localStorage.setItem("user", token);
      navigate("/dashboard");
    } else {
      console.error("Login failed");
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <h1>Login {token}</h1>
      <p>Please log in to continue</p>
      <form
        action="http://localhost:3000/login"
        method="POST"
        onSubmit={doLogin}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            aria-live="assertive"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {errorMessage && (
          <div className="alert alert-danger mt-3">{errorMessage}</div>
        )}
      </form>
    </div>
  );
}
