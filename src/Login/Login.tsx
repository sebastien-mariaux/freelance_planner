import React, { useState } from "react";
import { getToken } from "../api/authUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
      style={styles.form}
    >
      {displayErrors && <div style={styles.errorMessage}>
        {errorsList.map((error)=> {
          return <div>{error}</div>
        })}
      </div>}
      <div style={styles.fieldWrapper}>
        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          {...register("email", { required: true })}
        />
        {errors.email && <span>Ce champ est obligatoire</span>}
      </div>
      <div style={styles.fieldWrapper}>
        <label style={styles.label}>Mot de passe</label>
        <input
          type='password'
          style={styles.input}
          {...register("password", { required: true })}
        />
        {errors.password && <span>Ce champ est obligatoire</span>}
      </div>
      <input type="submit" style={styles.input} />
    </form>
  </div>)
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    margin: 'auto',
    maxWidth: '500px'
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    marginBottom: '1em'
  },
  label: {
    fontWeight: 'bold'
  },
  input: {
    height: '2em'
  },
  errorMessage: {
    height: '20px',
    border: '2px solid #915e00',
    backgroundColor: 'orange',
    borderRadius: '5px',
    padding: '0.5em',
    marginBottom: '2em'
  }
}