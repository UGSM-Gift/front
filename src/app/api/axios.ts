'use client'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.ugsm.co.kr',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  config.headers.Authorization = `Bearer eyJ0eXBlIjoiYWNjZXNzIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEyLCJsb2dpblR5cGUiOiJLQUtBTyIsImlhdCI6MTcwOTE5MTYwNSwiZXhwIjozNTA5MTkxNjA1fQ.E6wlZTCpv8zyysK0yXTAbE68k97Sfm0dwl_7d-oMvdU`;

  if (token) {
    config.headers.Authorization = `Bearer eyJ0eXBlIjoiYWNjZXNzIiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjEyLCJsb2dpblR5cGUiOiJLQUtBTyIsImlhdCI6MTcwOTE5MTYwNSwiZXhwIjozNTA5MTkxNjA1fQ.E6wlZTCpv8zyysK0yXTAbE68k97Sfm0dwl_7d-oMvdU`;
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