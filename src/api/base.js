import { clearData } from "./authUser";

const BaseUrl = "http://localhost:8000/";

function getFullUrl(route) {
  return new URL(route, BaseUrl);
}

function headers() {
  let headers = {
    "Content-Type": "application/json"
  }
  if (localStorage.getItem("token")) {
    headers["Authorization"] = "Token " + localStorage.getItem("token");
  }
  return headers;
}

export const urlGet = async (route) => {
  const res = await fetch(getFullUrl(route), {
    method: "GET",
    headers: headers()
  });
  if (res.status === 401) {
    clearData();
    // navigate to login
    window.location.href = "/login";
  }
  return await res.json();
}

export const urlCallWithBody = async (method, route, body, onSuccess, onError) => {
  const res = await fetch(getFullUrl(route), {
    method: method,
    headers: headers(),
    body: JSON.stringify(body)
  });

  if (res.ok) {
    if (res.status === 204) {
      onSuccess()
      return
    } else {
      onSuccess(await res.json())
    }
  } else {
    onError(await res.json())
  }
}

export const urlPost = async (route, body, onSuccess, onError) => {
  urlCallWithBody("POST", route, body, onSuccess, onError);
}


export const urlPatch = async (route, body, onSuccess, onError) => {
  urlCallWithBody("PATCH", route, body, onSuccess, onError);
}

export const urlDelete = async (route, body, onSuccess, onError) => {
  urlCallWithBody("DELETE", route, body, onSuccess, onError);
}
