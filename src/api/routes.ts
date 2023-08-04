export const routes: {[key: string]: any} = {
  login: '/accounts/login/',
  userInfo: '/accounts/users/me/',
  logout: '/accounts/logout/',
  companiesList: '/companies/',
  companySimulations: (companyId:string) => `/companies/${companyId}/simulations/`,
  companyDetailedSimulations: (companyId:string) => `/companies/${companyId}/detailed-simulations/`,
}