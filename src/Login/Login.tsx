import React, { useState } from "react";
import { getToken } from "../api/authUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { formStyle } from "../mainStyles";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [displayErrors, setDisplayErrors] = useState(false)
  const [errorsList, setErrorsList] = useState([])

  const redirectToMainPage = () => {
    navigate('/')
  }

  const onError = (data: any) => {
    setDisplayErrors(true)
    setErrorsList(data.non_field_errors)
    console.log(data)
  }

  const onSubmit = (data: {}) => {
    getToken(data, redirectToMainPage, onError)
  }

  // const hideErrors = () => {
  //   setDisplayErrors(false)
  // }

  return(
  <div className="login">
    <h1>Login</h1>
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={formStyle.form}
    >
      {displayErrors && <div style={formStyle.errorMessage}>
        {errorsList.map((error)=> {
          return <div>{error}</div>
        })}
      </div>}
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
          type='password'
          style={formStyle.input}
          {...register("password", { required: true })}
        />
        {errors.password && <span>Ce champ est obligatoire</span>}
      </div>
      <input type="submit" style={formStyle.input} />
    </form>
  </div>)
}

