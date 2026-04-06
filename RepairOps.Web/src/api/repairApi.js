import api from './axios';

export const getAllTickets = () => api.get('/repairticket');
export const getTicketById = (id) => api.get(`/repairticket/${id}`);
export const updateStatus = (id, status, note) =>
  api.put(`/repairticket/${id}/status`, { status, note });
export const addNote = (id, userId, note) =>
  api.post(`/repairticket/${id}/notes`, { userId, note });
export const getNotes = (id) => api.get(`/repairticket/${id}/notes`);