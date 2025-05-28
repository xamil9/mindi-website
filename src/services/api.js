// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
    static getAuthToken() {
        return localStorage.getItem('authToken');
    }

    static setAuthToken(token) {
        localStorage.setItem('authToken', token);
    }

    static logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }

    static async request(endpoint, options = {}) {
        const token = this.getAuthToken();
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
                ...(token && { Authorization: `Bearer ${token}` })
            }
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }

        return response.json();
    }

    static async getAnalytics() {
        return this.request('/analytics');
    }

    static async getFilms(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/films${queryString ? `?${queryString}` : ''}`);
    }

    static async createFilm(formData) {
        return fetch(`${API_BASE_URL}/films`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.getAuthToken()}`
            },
            body: formData
        }).then(res => res.json());
    }

    static async getUsers(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/users${queryString ? `?${queryString}` : ''}`);
    }

    static async getReferrals(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/referrals${queryString ? `?${queryString}` : ''}`);
    }
}

export default ApiService;