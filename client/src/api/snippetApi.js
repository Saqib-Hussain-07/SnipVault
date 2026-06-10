import api from './axiosInstance';

export const getSnippets = (params) => api.get('/snippets', { params });
export const createSnippet = (data) => api.post('/snippets', data);
export const updateSnippet = (id, data) => api.put(`/snippets/${id}`, data);
export const deleteSnippet = (id) => api.delete(`/snippets/${id}`);
export const getSnippet = (id) => api.get(`/snippets/${id}`);
export const getPublicSnippet = (shareId) => api.get(`/snippets/share/${shareId}`);
