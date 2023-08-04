export const routes: {[key: string]: any} = {
  login: '/accounts/login/',
  userInfo: '/accounts/users/me/',
  logout: '/accounts/logout/',
  companiesList: '/companies/',
  companySimulations: (companyId:string) => `/companies/${companyId}/simulations/`,
  companySimulation: (companyId:string, simulationId:string) => `/companies/${companyId}/simulations/${simulationId}/`,
  companyDetailedSimulations: (companyId:string) => `/companies/${companyId}/detailed-simulations/`,
  expenses: '/expenses/',
  linkExpense: (companyId: string, simulationId: string) =>  `/companies/${companyId}/simulations/${simulationId}/link_expense/`,
  unlinkExpense: (companyId: string, simulationId: string) =>  `/companies/${companyId}/simulations/${simulationId}/unlink_expense/`
}