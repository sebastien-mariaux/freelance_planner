import React, { useEffect, useState } from "react";
import CompanyForm from "./CompanyForm";
import { mainStyles } from "../mainStyles";
import { urlGet } from "../api/base";
import { routes } from "../api/routes";
import { colors } from "../colors";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  const AddCompany = () => {
    setDisplayForm(true);
  };

  const getCompanies = async () => {
    urlGet(routes.companiesList).then((data) => {
      setCompanies(data);
      localStorage.setItem("companies", JSON.stringify(data));
    });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="companies">
      {/* <NavMenu activeItem="companies" /> */}
      <h2>
        Entreprises
        {!displayForm && (
          <button onClick={AddCompany} style={mainStyles.titleButton}>
            Ajouter une entreprise
          </button>
        )}
      </h2>
      {displayForm && <CompanyForm getCompanies={getCompanies} />}
      <div style={styles.companiesContainer}>
      {companies.map((company) => {
        const url = `/companies/${company.id}/simulations`;
        return (
          <div key={company.id} style={styles.companyCard}>
            <a href={url} style={styles.cardTitle}>{company.name}</a>
            {company.description && <div>{company.description}</div>}
          </div>
        );
      })}
      </div>
      {companies.length === 0 && (
        <div>Vous n'avez créé aucune entreprise pour le moment !</div>
      )}
    </div>
  );
}

const styles = {
  companyCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.secondary,
    margin: "10px",
    padding: "10px",
    maxWidth: '30%',
    borderRadius: '5px',
    minWidth: '150px',
  },
  companiesContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  cardTitle: {
    fontSize: '1.2em',
    fontWeight: 'bold',
  }
}