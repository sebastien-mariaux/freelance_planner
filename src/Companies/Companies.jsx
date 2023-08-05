import React, { useEffect, useState } from "react";
import NavMenu from "../NavMenu/NavMenu";
import CompanyForm from "./CompanyForm";
import { mainStyles } from "../mainStyles";
import { urlGet } from "../api/base";
import { routes } from "../api/routes";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  const AddCompany = () => {
    setDisplayForm(true);
  };

  const getCompanies = async () => {
    urlGet(routes.companiesList).then((data) => {
      console.log(companies);
      setCompanies(data);
      localStorage.setItem("companies", JSON.stringify(data));
    });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="companies">
      <NavMenu activeItem="companies" />
      <h2>
        Entreprises
        {!displayForm && (
          <button onClick={AddCompany} style={mainStyles.titleButton}>
            Ajouter une entreprise
          </button>
        )}
      </h2>
      {displayForm && <CompanyForm getCompanies={getCompanies} />}
      {companies.map((company) => {
        const url = `/companies/${company.id}/simulations`;
        return (
          <div key={company.id}>
            <a href={url}>{company.name}</a>
            {company.description && <span> - {company.description}</span>}
          </div>
        );
      })}
      {companies.length === 0 && (
        <div>Vous n'avez créé aucune entreprise pour le moment !</div>
      )}
    </div>
  );
}
