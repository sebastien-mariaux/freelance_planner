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

export async function urlGet(route: string) {
  const res = await fetch(getFullUrl(route), {
    method: "GET",
    headers: headers(),
  });
  return await res.json();
}

export async function urlPost(route: string, body: any) {
  const res = await fetch(getFullUrl(route), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  return await res.json();
}