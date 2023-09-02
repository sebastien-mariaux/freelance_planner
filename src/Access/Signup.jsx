import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buttonStyle, formStyle } from "../mainStyles";
import { routes } from "../api/routes";
import { urlGet, urlPost } from "../api/base";
import { ErrorMessage } from "@hookform/error-message";

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [displayErrors, setDisplayErrors] = useState(false);
  const [errorsList, setErrorsList] = useState([]);

  const onError = (data) => {
    setDisplayErrors(true);

    setErrorsList([...data.non_field_errors || [], data.detail]);
    setDisplayErrors(true);
  };

  const onSubmit = async (params) => {
    urlPost(
      routes.signup,
      params,
      (data) => {
        // getUserData();
        setErrorsList(data.non_field_errors);

        navigate("/");
      },
      onError
    );
  };

  const checkPasswords = (e) => {
    const password1 = getValues("password");
    const password2 = e.target.value;
    if (password1 !== password2) {
      setError("password_confirmation", {
        type: "manual",
        message: "Les mots de passe ne correspondent pas",
      });
    }
  };
  console.log('errorsList', errorsList)
  return (
    <div className="signup" style={{ maxWidth: "500px", margin: "auto" }}>
      <h1>Créer un compte</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle.form}>
        {displayErrors && (
          <div style={formStyle.errorMessage}>
            {errorsList?.map((error) => {
              return <div>{error}</div>;
            })}
          </div>
        )}
        <div style={formStyle.fieldWrapper}>
          <label className="required" style={formStyle.label}>
            Email
          </label>
          <input
            style={formStyle.input}
            {...register("email", { required: true })}
          />
          {errors.email && <span>Ce champ est obligatoire</span>}
        </div>
        <div style={formStyle.fieldWrapper}>
          <label className="required" style={formStyle.label}>
            Mot de passe
          </label>
          <input
            type="password"
            style={formStyle.input}
            {...register("password", { required: true })}
          />
          {errors.password && <span>Ce champ est obligatoire</span>}
        </div>
        <div style={formStyle.fieldWrapper}>
          <label className="required" style={formStyle.label}>
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            style={formStyle.input}
            {...register("password_confirmation", { required: true, onBlur: checkPasswords })}
          />
          {/* <ErrorMessage
            errors={errors}
            name="password_confirmation"
            render={({ message }) => <p>{message}</p>}
          /> */}
          {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}

        </div>

        <div style={formStyle.fieldWrapper}>
          <label style={formStyle.label}>Prénom</label>
          <input
            style={formStyle.input}
            {...register("first_name", { required: true })}
          />
          {errors.first_name && <span>Ce champ est obligatoire</span>}
        </div>
        <div style={formStyle.fieldWrapper}>
          <label style={formStyle.label}>Nom de famille</label>
          <input
            style={formStyle.input}
            {...register("last_name", { required: true })}
          />
          {errors.last_name && <span>Ce champ est obligatoire</span>}
        </div>
        <input className="button" type="submit" value="C'est parti !" />
      </form>
    </div>
  );
}
