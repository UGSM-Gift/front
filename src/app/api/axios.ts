'use client'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.ugsm.co.kr',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//
// const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  // "Authorization": `Bearer ${token}`
}

export default instance;
export { headers };