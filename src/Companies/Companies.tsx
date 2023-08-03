import React, { useEffect, useState } from "react";
import NavMenu from "../NavMenu/NavMenu";

interface Company {
  name: string
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])

  const AddCompany = () => {
    console.log('add company')
  }

  useEffect(()=> {
    return
    setCompanies([])
  }, [companies])

  return(
    <div className="companies">
      <h2>Companies</h2>
      <button
        onClick={AddCompany}
      >
        Ajouter une entreprise
      </button>
      <NavMenu activeItem='companies' />
      {
        companies.map(company => {
          return <>{company.name}</>
        })
      }
    </div>
  )
}