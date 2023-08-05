import { clearData } from "./authUser";

const BaseUrl: string = "http://localhost:8000/";

function getFullUrl(route: string): URL {
  return new URL(route, BaseUrl);
}

function headers(): { [key: string]: string; } {
  let headers: { [key: string]: string; } = {
    "Content-Type": "application/json",
  }
  if (localStorage.getItem("token")) {
    headers["Authorization"] = "Token " + localStorage.getItem("token");
  }
  return headers;
}

export const urlGet = async(route: string) => {
  const res = await fetch(getFullUrl(route), {
    method: "GET",
    headers: headers(),
  });
  if (!res.ok) {
    clearData();
  }
  return await res.json();
}

export const urlCallWithBody = async (
  method: string,
  route: string,
  body: any,
  onSuccess: (json: any) => void=()=>{},
  onError: (json: any) => void=() => {}
  ) => {
  const res = await fetch(getFullUrl(route), {
    method: method,
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (res.ok) {
    onSuccess(await res.json())
  } else {
    onError(await res.json())
  }
}

export const urlPost = async (
  route: string,
  body: any,
  onSuccess: (json: any) => void=()=>{},
  onError: (json: any) => void=() => {}
  ) => {
  urlCallWithBody("POST", route, body, onSuccess, onError);
}


export const urlPatch = async (
  route: string,
  body: any,
  onSuccess: (json: any) => void=()=>{},
  onError: (json: any) => void=() => {}
  ) => {
  urlCallWithBody("PATCH", route, body, onSuccess, onError);
}

export const urlDelete = async (
  route: string,
  body: any,
  onSuccess: (json: any) => void=()=>{},
  onError: (json: any) => void=() => {}
  ) => {
  urlCallWithBody("DELETE", route, body, onSuccess, onError);
}
