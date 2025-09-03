import { BASE_URL } from "../config";

export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Ошибка регистрации.');
  return response.json();
}

export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}/auth/jwt/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Ошибка авторизации.');
}
