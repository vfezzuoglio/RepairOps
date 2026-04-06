import api from './axios';

export const getAllParts = () => api.get('/inventory/parts');
export const createPart = (data) => api.post('/inventory/parts', data);
export const usePart = (data) => api.post('/inventory/parts/use', data);