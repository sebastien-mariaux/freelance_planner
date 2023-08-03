import { urlGet, urlPost } from "./base"
import { routes } from "./routes"

export interface Company {
  name: string,
  description: string
}


export const getCompaniesList = (onSuccess: (data: any)=> void) => {
  urlGet(routes.companiesList).then((data=>{
    onSuccess(data)
  }))
}

export const createCompany = (
  data: {},
  onSuccess: () => void,
  onFailure: () => void,
  ) => {
    urlPost(routes.companiesList, data, onSuccess, onFailure)
}