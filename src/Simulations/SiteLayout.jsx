import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoginMenuItem from "../NavMenu/LoginMenuItem";

export default function SiteLayout() {
  const navigate = useNavigate();

  return (
    <div style={{ margin: "0 50px 20px 50px" }}>
      <header style={{ display: "flex" }}>
        <h1
          style={{ display: "block", marginBottom: "0px" }}
          onClick={() => {
            navigate("/");
          }}
        >
          FREELANCE PLANNER
        </h1>
        <a
          href="/a-propos"
          style={{
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          À propos...
        </a>
        <LoginMenuItem />
      </header>
      <Outlet />
      <footer style={{ marginTop: "50px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span>&copy;&nbsp;</span>
          <a href="https://sebastien-mariaux.com/">Sébastien Mariaux</a>
          <span>&nbsp;- 2023</span>
        </div>
      </footer>
    </div>
  );
}
