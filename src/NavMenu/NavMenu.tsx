import React from 'react'

interface NavMenuProps {
  activeItem: 'simulations' | 'expenses' | 'achieved' | 'companies'
}

export default function NavMenu({ activeItem }: NavMenuProps) {
  return (
    <div style={styles.navMenu}>
      <div style={itemStyle(activeItem, 'companies')}>
        <a
          href='/companies'
          style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}
        >
          Entreprises
        </a>
      </div>
      <div style={itemStyle(activeItem, 'simulations')} >
        <a
          href='/simulations'
          style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}
        >
          Simulations
        </a>
      </div>
      <div style={itemStyle(activeItem, 'expenses')}>
        <a
          href='/expenses'
          style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}
        >
          Calculateur de charges
        </a>
      </div>
      <div style={itemStyle(activeItem, 'achieved')}>
        <a
          href='/achieved'
          style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}
        >
          Réalisé
        </a>
      </div>
    </div>
  )
}

const styles = {
  navMenu: {
    display: 'flex',
  }
}

const itemStyle = (activeItem: string, currentItem: string) => {
  return {
    padding: '0.5em',
    fontWeight: activeItem === currentItem ? 'bold' : 'normal',
  }
}
