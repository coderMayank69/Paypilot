import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
});

export default {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  signup: (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    company?: string
  ) =>
    api.post('/api/auth/signup', {
      email,
      firstName,
      lastName,
      password,
      company,
    }),
  getProfile: () =>
    api.get('/api/auth/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    }),
  updateProfile: (data: any) =>
    api.put('/api/auth/profile', data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    }),
};
