//export const BASE_URL = 'https://api.novch.nomoredomains.xyz';

export const BASE_URL = "https://localhost:3000";

function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}.`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },    
    credentials: 'include',
    body: JSON.stringify({email, password}),
  }).then((res) => checkRes(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },    
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  }).then((res) => checkRes(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },    
    credentials: 'include'
  }).then((res) => checkRes(res))
};
