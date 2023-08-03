import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { formStyle } from "../mainStyles";
import { routes } from "../api/routes";
import { urlGet, urlPost } from "../api/base";
import { AuthData, AuthError } from "./loginTypes";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [displayErrors, setDisplayErrors] = useState(false);
  const [errorsList, setErrorsList] = useState<string[]>([]);

  const onError = (data: AuthError) => {
    setDisplayErrors(true);
    setErrorsList(data.non_field_errors);
  };

  const onSubmit = async (params: FieldValues) => {
    urlPost(
      routes.login,
      params,
      (data: AuthData) => {
        localStorage.setItem("token", data.token);
        getUserData();
        navigate("/");
      },
      onError
    );
  };

  const getUserData = async () => {
    urlGet(routes.userInfo).then((data) => {
      localStorage.setItem("userData", JSON.stringify(data));
    });
  };

  // const hideErrors = () => {
  //   setDisplayErrors(false)
  // }

  return (
    <div className="login">
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
        <input type="submit" style={formStyle.input} />
      </form>
    </div>
  );
}
