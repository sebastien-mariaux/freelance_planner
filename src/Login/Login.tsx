import React from "react";
import { urlPost } from "../api/base";

export default function Login() {

  const login = async () => {
    urlPost("/accounts/login/", {
      email: "jake.peralta@b99.com",
      password: "ILoveAmy99"
    }).then((data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
    });
  }

  return(
  <div className="login">
    <h1>Login</h1>
    <p>TODO</p>
    <button
      onClick={login}
    >
      GET LOGGED IN
    </button>
  </div>)
}