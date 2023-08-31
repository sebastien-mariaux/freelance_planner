import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoginMenuItem from "../NavMenu/LoginMenuItem";
import { colors } from "../colors";
import { navStyle } from "../mainStyles";

export default function SiteLayout() {
  const navigate = useNavigate();

  return (
    <div className='global-wrapper' >
      <div>

      <header style={styles.header}>
        <div
          className="main-title"
          style={styles.mainTitle}
          onClick={() => {
            navigate("/");
          }}
        >
          FREELANCE PLANNER
        </div>
        <nav>
          <a style={navStyle.navLink}
            href="/a-propos"
          >
            À propos...
          </a>
          <a style={navStyle.navLink}
            href="/feedback"
          >
            Feedback
          </a>
          <a style={navStyle.navLink}
            href="/profile"
          >
            Mon compte
          </a>
          <LoginMenuItem />
        </nav>
      </header>

      <div style={styles.contentContainer}>
        <Outlet />
      </div>
      </div>

        <footer style={{ margin: "50px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span>&copy;&nbsp;</span>
            <a href="https://sebastien-mariaux.com/">Sébastien Mariaux</a>
            <span>&nbsp;- 2023</span>
          </div>
        </footer>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    backgroundColor: colors.primary,
    padding: "10px 50px",
    color: colors.secondary,
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    margin: "0 50px 20px 50px",
  },
  mainTitle: {
    display: "block",
    margin: "0",
    fontSize: "2em",
    fontWeight: "bold",
  },
};
