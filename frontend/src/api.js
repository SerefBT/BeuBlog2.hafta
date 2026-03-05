import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getPosts = async () => await api.get('/posts');
export const getPostBySlug = async (slug) => await api.get(`/posts/by-slug/${slug}`);
export const getPostById = async (id) => await api.get(`/posts/${id}`);
export const createPost = async (postData) => await api.post('/posts', postData);
export const deletePost = async (id) => await api.delete(`/posts/${id}`);
export const likePost = async (id) => await api.put(`/posts/${id}/like`);
export const updatePostStatus = async (id, status) => await api.put(`/posts/${id}/status`, { status });

export const getCategories = async () => await api.get('/categories');
export const createCategory = async (data) => await api.post('/categories', data);
export const deleteCategory = async (id) => await api.delete(`/categories/${id}`);

export const loginUser = async (data) => await api.post('/auth/login', data);
export const registerUser = async (data) => await api.post('/auth/register', data);
export const getMe = async () => await api.get('/auth/me');
export const updateProfile = async (data) => await api.put('/auth/me/profile', data);
export const updatePassword = async (data) => await api.put('/auth/me/password', data);
export const getMyPosts = async () => await api.get('/auth/me/posts');

export const uploadImage = async (formData) => await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
