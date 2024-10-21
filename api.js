import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const getContacts = (token) => axios.get(`${API_URL}/contacts`, {
    headers: { Authorization: token }
});
export const addContact = (contact, token) => axios.post(`${API_URL}/contacts/add`, contact, {
    headers: { Authorization: token }
});
