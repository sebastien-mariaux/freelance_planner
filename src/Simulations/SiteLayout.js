import { Outlet, useNavigate } from "react-router-dom";

export default function SiteLayout({children}){
  const navigate = useNavigate();

  return(
    < div style={{ margin: '0 50px 20px 50px' }}>
    <header style={{ display: 'flex' }} >
      <h1 style={{ display: 'block', marginBottom: '0px' }} onClick={()=>{navigate('/')}}>
        FREELANCE PLANNER
        </h1>
      <a
        href='/a-propos'
        alt='A  propos du site'
        style={{ marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto' }}
      >
        À propos...
      </a>
    </header>
    <Outlet/>
    <footer style={{ marginTop: '50px' }} >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span>&copy;&nbsp;</span>
        <a href='https://sebastien-mariaux.com/' alt='site du créateur'>
          Sébastien Mariaux
        </a>
        <span>&nbsp;- 2023</span>
      </div>
    </footer>
  </div>
  )
}