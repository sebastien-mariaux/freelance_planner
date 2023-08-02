import React from "react";
import { getToken } from "../api/authUser";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const redirectToMainPage = () => {
    navigate('/')
  }

  return(
  <div className="login">
    <h1>Login</h1>
    <p>TODO</p>
    <button
      onClick={()=>getToken(redirectToMainPage)}
    >
      GET LOGGED IN
    </button>
  </div>)
}