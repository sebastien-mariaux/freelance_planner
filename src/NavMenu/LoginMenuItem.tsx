import React from "react";
import { logout } from "../api/authUser";

export default function LoginMenuItem() {
  const token = localStorage.getItem('token')
  if (token) {
    return (
      <a
        href='/login'
        style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}
        onClick={logout}
      >
        Logout
      </a>
    )
  }

  return (
    <a
    href='/login'
    style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}
  >

  </a>
  )
}