import { urlGet } from "./base";
import { routes } from "./routes";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  urlGet(routes.logout)
}