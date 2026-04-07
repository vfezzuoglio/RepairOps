import api from './axios';

export const getAllTickets = () => api.get('/repairticket');
export const getTicketById = (id) => api.get(`/repairticket/${id}`);
export const createTicket = (data) => api.post('/repairticket', data);
export const getCustomers = (searchTerm) => api.get(`/customer/search?searchTerm=${searchTerm}`);
export const createCustomer = (data) => api.post('/customer', data);
export const getDevices = (customerId) => api.get(`/device/customer/${customerId}`);
export const createDevice = (data) => api.post('/device', data);
export const updateStatus = (id, status, note) => api.put(`/repairticket/${id}/status`, { status, note });
export const addNote = (id, userId, note) => api.post(`/repairticket/${id}/notes`, { userId, note });
export const getNotes = (id) => api.get(`/repairticket/${id}/notes`);
export const getTicketServices = (repairTicketId) => 
  api.get(`/ticketservice/${repairTicketId}/services`);
export const addTicketService = (repairTicketId, data) => 
  api.post(`/ticketservice/${repairTicketId}/services`, data);
export const removeTicketService = (id) => api.delete(`/ticketservice/${id}`);
export const getTicketTotal = (repairTicketId) => 
  api.get(`/ticketservice/${repairTicketId}/total`);
export const searchServicePrices = (brand, model) =>
  api.get(`/serviceprice/search?brand=${brand}&model=${model}`);