import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { buttonStyle, formStyle } from "../mainStyles";
import { routes } from "../api/routes";
import { urlGet, urlPost } from "../api/base";

export default function ResetPassword() {
  const [queryParameters] = useSearchParams();
  const code = queryParameters.get("code");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (params) => {
    let url = ''
    if (code?.length > 0) {
      url = routes.resetPasswordConfirm
      params.code = code
    } else {
      url = routes.resetPassword;
    }

    urlPost(
      url,
      params,
      (data) => {
        navigate("/login");
      },
      () => {}
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

  return (
    <div className="login" style={{ maxWidth: "500px", margin: "auto" }}>
      <h1>Réinitialisation du mot de passe</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyle.form}>
        <div style={formStyle.fieldWrapper}>
          <label style={formStyle.label}>Email</label>
          <input
            style={formStyle.input}
            {...register("email", { required: true })}
          />
          {errors.email && <span>Ce champ est obligatoire</span>}
        </div>

        {code && (
          <>
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
                {...register("password_confirmation", {
                  required: true,
                  onBlur: checkPasswords,
                })}
              />
            </div>
          </>
        )}

        <input className="button" type="submit" value="C'est parti !" />
      </form>
    </div>
  );
}
