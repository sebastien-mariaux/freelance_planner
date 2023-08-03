import React, { useEffect, useState } from "react";
import NavMenu from "../NavMenu/NavMenu";
import CompanyForm from "./CompanyForm";
import { Company, getCompaniesList } from "../api/companies";
import { mainStyles } from "../mainStyles";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [displayForm, setDisplayForm] = useState(false)

  const AddCompany = () => {
    setDisplayForm(true)
  }

  const onGetCompaniesSuccess = (data: any) => {
    setCompanies(data)
  }

  const getCompanies = () => {
    getCompaniesList(onGetCompaniesSuccess)
  }

  useEffect(()=> {
    getCompanies()
  }, [])

  return(
    <div className="companies">
      <NavMenu activeItem='companies' />
      <h2>Entreprises


      {!displayForm && <button
        onClick={AddCompany}
        style={mainStyles.titleButton}
      >
        Ajouter une entreprise
      </button>}
      </h2>
      {displayForm && <CompanyForm getCompanies={getCompanies} />}
      {
        companies.map(company => {
          return (<div>
            {company.name}
            {company.description && <span> - {company.description}</span>}
            </div>)
        })
      }
      {companies.length === 0 && <div>
          Vous n'avez créé aucune entreprise pour le moment !
        </div>}
    </div>
  )
}