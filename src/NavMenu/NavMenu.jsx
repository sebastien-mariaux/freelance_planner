import React, { useEffect, useState } from "react";

export default function NavMenu({ activeItem }) {
  const isPremium = false;

  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

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
          href={`/companies/${companyId}/simulations`}
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
        <div style={itemStyle(activeItem, "accounting")}>
          <a
            href={`/companies/${companyId}/accounting`}
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Comptabilité
          </a>
        </div>
      ) : (
        <div style={itemStyle(activeItem, "accounting")}>
          <span title='En travaux' style={styles.disabledLink}>Comptabilité</span>
        </div>
      )}
      <div style={itemStyle(activeItem, "accounting")}>
          <a
            href={`/companies/${companyId}/accounting`}
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            Comptabilité
          </a>
        </div>
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
