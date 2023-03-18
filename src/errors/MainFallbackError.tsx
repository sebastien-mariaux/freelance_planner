import React from 'react'

export default function MainFallbackError() {
  const clearLocalStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h1>Une erreur est survenue !</h1>
      <button onClick={clearLocalStorage}>Réinitialiser les données et réessayer</button>
    </div>
  )
}
