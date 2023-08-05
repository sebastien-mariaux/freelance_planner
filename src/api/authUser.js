import { urlGet } from "./base";
import { routes } from "./routes";

export const logout = () => {
  clearData();
  urlGet(routes.logout)
}

export const clearData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
}