'use client'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.ugsm.co.kr',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  config.headers.Authorization = `Bearer eyJ0eXBlIjoiYWNjZXNzIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEyLCJsb2dpblR5cGUiOiJLQUtBTyIsImlhdCI6MTcwODk5ODUzNiwiZXhwIjoxNzEwNzk4NTM2fQ.Df1gh2wGXMr6_LEsJNMCgAX9eshFX7w9ou-QvCF6rvY`;

  if (token) {
    config.headers.Authorization = `Bearer eyJ0eXBlIjoiYWNjZXNzIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEyLCJsb2dpblR5cGUiOiJLQUtBTyIsImlhdCI6MTcwODk5ODUzNiwiZXhwIjoxNzEwNzk4NTM2fQ.Df1gh2wGXMr6_LEsJNMCgAX9eshFX7w9ou-QvCF6rvY`;
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