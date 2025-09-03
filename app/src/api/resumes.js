import { BASE_URL } from "../config";

export async function addResume(data) {
  const response = await fetch(`${BASE_URL}/resumes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Ошибка добавления резюме.');
  return response.json();
}

export async function getResumes() {
  const response = await fetch(`${BASE_URL}/resumes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Ошибка получения резюме.');
  const data = await response.json();
  return data;
}

export async function getResumeDetails(id) {
  const response = await fetch(`${BASE_URL}/resumes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Ошибка получения резюме.');
  const data = await response.json();
  return data;
}

export async function getImprovedResume(id) {
  const response = await fetch(`${BASE_URL}/resumes/${id}/improve`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Ошибка улучшения резюме.');
  const data = await response.json();
  return data;
}
