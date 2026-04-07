import api from './axios';

// Service Prices
export const getAllServicePrices = () => api.get('/serviceprice');
export const searchServicePrices = (brand, model) => 
  api.get(`/serviceprice/search?brand=${brand}&model=${model}`);
export const createServicePrice = (data) => api.post('/serviceprice', data);
export const deleteServicePrice = (id) => api.delete(`/serviceprice/${id}`);

// Ticket Services
export const getTicketServices = (repairTicketId) => 
  api.get(`/ticketservice/${repairTicketId}/services`);
export const addTicketService = (repairTicketId, data) => 
  api.post(`/ticketservice/${repairTicketId}/services`, data);
export const removeTicketService = (id) => api.delete(`/ticketservice/${id}`);
export const getTicketTotal = (repairTicketId) => 
  api.get(`/ticketservice/${repairTicketId}/total`);