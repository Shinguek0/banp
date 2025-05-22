// axiosConfig.ts
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://192.168.7.10:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export { api };
