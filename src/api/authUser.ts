import { urlGet, urlPost } from "./base";
import { routes } from "./routes";

export const getToken = async (
  data: {},
  onSuccess: (json: {}) => void=()=>{},
  onError: (json: {}) => void=() => {}
  ) => {
    const onLoginSuccess = (data: any) => {
      localStorage.setItem('token', data.token)
      getUserData()
      onSuccess(data)
    }
    urlPost(routes.login, data, onLoginSuccess, onError)
}

export const getUserData = async () => {
  urlGet(routes.userInfo).then((data) => {
    localStorage.setItem("userData", JSON.stringify(data))
  })
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  urlGet(routes.logout)
}