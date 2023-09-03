import React from "react";
import { logout } from "../api/authUser";
import { navStyle } from "../mainStyles";

export default function LoginMenuItem() {
  const token = localStorage.getItem('token')
  if (token) {
    return (
      <a
        href='/login'
        onClick={logout}
        style={navStyle.navLink}
      >
        Logout
      </a>
    )
  }

  return (
    <>
    <a
    href='/login'
    style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' , ...navStyle.navLink}}
  >
    Login
  </a>
  <a
  href='/signup'
  style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' , ...navStyle.navLink}}
>
  Inscription
</a>
    </>
  )
}