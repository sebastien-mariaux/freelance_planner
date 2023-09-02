import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buttonStyle, formStyle } from "../mainStyles";
import { routes } from "../api/routes";
import { urlGet, urlPost } from "../api/base";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [displayErrors, setDisplayErrors] = useState(false);
  const [errorsList, setErrorsList] = useState([]);

  const onError = (data) => {
    setDisplayErrors(true);
    setErrorsList(data.non_field_errors);
  };

  const onSubmit = async (params) => {
    urlPost(
      routes.login,
      params,
      (data) => {
        localStorage.setItem("token", data.token);
        // getUserData();
        navigate("/");
      },
      onError
    );
  };

  return (
    <div className="login" style={{maxWidth: '500px',  margin: 'auto'}}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle.form}>
        {displayErrors && (
          <div style={formStyle.errorMessage}>
            {errorsList.map((error) => {
              return <div>{error}</div>;
            })}
          </div>
        )}
        <div style={formStyle.fieldWrapper}>
          <label style={formStyle.label}>Email</label>
          <input
            style={formStyle.input}
            {...register("email", { required: true })}
          />
          {errors.email && <span>Ce champ est obligatoire</span>}
        </div>
        <div style={formStyle.fieldWrapper}>
          <label style={formStyle.label}>Mot de passe</label>
          <input
            type="password"
            style={formStyle.input}
            {...register("password", { required: true })}
          />
          {errors.password && <span>Ce champ est obligatoire</span>}
        </div>
        <input className='button' type="submit" value="C'est parti !" />
      </form>
      <div style={{marginTop: '1em', fontStyle: 'italic'}}>
      Pas encore inscrit·e ? <a href="/signup">Cliquez ici pour créer un compte.</a>
      </div>
      <div style={{marginTop: '1em', fontStyle: 'italic'}}>
        <a
        href="/reset-password"
        >Mot de passe oublié ?</a>
      </div>

    </div>
  );
}
