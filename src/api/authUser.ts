import { urlGet, urlPost } from "./base";
import { routes } from "./routes";

export const getToken = async (callback: () => void=()=>{}) => {
  urlPost(routes.login, {
    email: "jake.peralta@b99.com",
    password: "ILoveAmy99"
  }).then((data) => {
    console.log(data);
    localStorage.setItem("token", data.token);
    getUserData()
    callback()
  });
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