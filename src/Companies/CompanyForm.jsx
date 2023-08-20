import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formStyle, inlineStyle } from "../mainStyles";
import { urlPost } from "../api/base";
import { routes } from "../api/routes";

export default function CompanyForm({ getCompanies }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [displayErrors, setDisplayErrors] = useState(false);
  const [errorsList, setErrorsList] = useState([]);

  const onSubmit = (data) => {
    urlPost(routes.companiesList, data, getCompanies, onFailure);
  };

  const onFailure = () => {
    setDisplayErrors(true);
    setErrorsList([
      "L'entreprise n'a pas pu être créée. Assurez vous qu'elle n'existe pas déjà",
    ]);
  };

  return (
    <div className="companyForm" style={{...formStyle.inlineForm,  marginBottom: '2em'}}>
      <h3 style={inlineStyle.formTitle}>Nouvelle entreprise</h3>

      {displayErrors && (
        <div style={inlineStyle.errorMessage}>
          {errorsList.map((error) => {
            return <div>{error}</div>;
          })}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} style={inlineStyle.form}>
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
        <input
        style={{alignSelf: "flex-end"}}
          type="submit"
          value="Créer l'entreprise"
          className="button small"
        />
      </form>
    </div>
  );
}
