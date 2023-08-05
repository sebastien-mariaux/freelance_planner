export const routes = {
  login: '/accounts/login/',
  userInfo: '/accounts/users/me/',
  logout: '/accounts/logout/',
  companiesList: '/companies/',
  companySimulations: (companyId) => `/companies/${companyId}/simulations/`,
  companySimulation: (companyId, simulationId) => `/companies/${companyId}/simulations/${simulationId}/`,
  companyDetailedSimulations: (companyId) => `/companies/${companyId}/detailed-simulations/`,
  expenses: '/expenses/',
  linkExpense: (companyId, simulationId) => `/companies/${companyId}/simulations/${simulationId}/link_expense/`,
  unlinkExpense: (companyId, simulationId) => `/companies/${companyId}/simulations/${simulationId}/unlink_expense/`
}
