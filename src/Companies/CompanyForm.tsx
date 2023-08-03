import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { inlineStyle } from "../mainStyles";
import { urlPost } from "../api/base";
import { routes } from "../api/routes";

interface CompanyFormProps {
  getCompanies: () => void
}

export default function CompanyForm({getCompanies}: CompanyFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [displayErrors, setDisplayErrors] = useState(false)
  const [errorsList, setErrorsList] = useState<string[]>([])

  const onSubmit = (data: FieldValues) => {
    urlPost(
      routes.companiesList,
      data,
      getCompanies,
      onFailure);
  }

  const onFailure = () => {
    setDisplayErrors(true)
    setErrorsList(["L'entreprise n'a pas pu être créée. Assurez vous qu'elle n'existe pas déjà"])
  }

  return(
    <div className="companyForm">
      <h3>Nouvelle entreprise</h3>

      {displayErrors && <div style={inlineStyle.errorMessage}>
        {errorsList.map((error)=> {
          return <div>{error}</div>
        })}
      </div>}
      <form
      onSubmit={handleSubmit(onSubmit)}
      style={inlineStyle.form}
    >
      <div style={inlineStyle.fieldWrapper}>
        <label style={inlineStyle.label}>Nom</label>
        <input
          style={inlineStyle.input}
          {...register("name", { required: true })}
        />
        {errors.name && <span>Ce champ est obligatoire</span>}
      </div>
      <div style={inlineStyle.fieldWrapper}>
        <label style={inlineStyle.label}>Description</label>
        <input
          style={inlineStyle.input}
          {...register("description", { required: true })}
        />
      </div>
      <input type="submit" value="Créer l'entreprise" style={{...inlineStyle.input, ...inlineStyle.submit}} />
    </form>
    </div>
  )
}