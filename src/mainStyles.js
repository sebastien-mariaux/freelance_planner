import { colors } from "./colors"

export const mainStyles = {
  titleButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '25px',
    fontSize: 'initial',
  },
  info: {
    fontSize: '0.8em',
    fontStyle: 'italic',
  },
  infoSection: {
    marginBottom: '10px',
  },
}

export const formStyle = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: '500px'
  },
  largeForm: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px'
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
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
  },
  inlineForm: {
    padding: "20px",
    backgroundColor: "#eee",
    borderRadius: "5px",
  },
}

export const inlineStyle = {
  form: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
  },
  fieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '2em',
  },
  label: {
    marginBottom: '0.2em',
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
  },
  submit: {
    alignSelf: 'flex-end'
  },
  formTitle: {
    marginBottom: '1em',
    marginTop: 0
  }
}

export const buttonStyle = {
  main: {
    height: '2em',
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: '1em',
    fontFamily: 'inherit',
    borderRadius: '5px',
    border: 'none',
  }
}

export const navStyle = {
  navLink: {
    color: colors.secondary,
    textDecoration: "none",
    padding: "0 10px",
  }
}