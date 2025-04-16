import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API endpoints for spots
export const spotsApi = {
  getAll: () => api.get('/spots'),
  getById: (id: string) => api.get(`/spots/${id}`),
  create: (data: any) => api.post('/spots', data),
  update: (id: string, data: any) => api.put(`/spots/${id}`, data),
  delete: (id: string) => api.delete(`/spots/${id}`),
};

// API endpoints for trips
export const tripsApi = {
  getAll: () => api.get('/trips'),
  getById: (id: string) => api.get(`/trips/${id}`),
  create: (data: any) => api.post('/trips', data),
  update: (id: string, data: any) => api.put(`/trips/${id}`, data),
  delete: (id: string) => api.delete(`/trips/${id}`),
  markAsCompleted: (id: string) => api.post(`/trips/${id}/complete`),
  rate: (id: string, rating: number) => api.post(`/trips/${id}/rate`, { rating }),
};

// API endpoints for comments
export const commentsApi = {
  getBySpot: (spotId: string) => api.get(`/comments/spot/${spotId}`),
  getByTrip: (tripId: string) => api.get(`/comments/trip/${tripId}`),
  create: (data: any) => api.post('/comments', data),
  update: (id: string, data: any) => api.put(`/comments/${id}`, data),
  delete: (id: string) => api.delete(`/comments/${id}`),
  like: (id: string) => api.post(`/comments/${id}/like`),
};

// API endpoints for auth
export const authApi = {
  googleLogin: (token: string) => api.post('/auth/google', { token }),
  getProfile: () => api.get('/users/me'),
};

export default api;