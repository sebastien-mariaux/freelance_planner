import React from "react";

export default function NavMenu({ activeItem }) {
  const isPremium = false;

  return (
    <div style={styles.navMenu}>
      <div style={itemStyle(activeItem, "companies")}>
        <a
          href="/companies"
          style={{
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          Entreprises
        </a>
      </div>
      <div style={itemStyle(activeItem, "simulations")}>
        <a
          href="/simulations"
          style={{
            marginLeft: "auto",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          Simulations
        </a>
      </div>
      {isPremium ? (
        <div style={itemStyle(activeItem, "achieved")}>
          <a
            href="/achieved"
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Réalisé
          </a>
        </div>
      ) : (
        <div style={itemStyle(activeItem, "achieved")}>
          <span title='En travaux' style={styles.disabledLink}>Réalisé</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  navMenu: {
    display: "flex",
  },
  disabledLink: {
    fontStyle: 'italic',
    color: 'grey',
  }
};

const itemStyle = (activeItem, currentItem) => {
  return {
    padding: "0.5em",
    fontWeight: activeItem === currentItem ? "bold" : "normal",
  };
};
