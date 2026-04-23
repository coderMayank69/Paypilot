import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle responses
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async signup(email: string, firstName: string, lastName: string, password: string, company?: string) {
    return this.client.post('/auth/signup', {
      email,
      firstName,
      lastName,
      password,
      company,
    });
  }

  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  async getProfile() {
    return this.client.get('/auth/profile');
  }

  async updateProfile(data: any) {
    return this.client.put('/auth/profile', data);
  }

  // Client endpoints
  async createClient(clientData: any) {
    return this.client.post('/clients', clientData);
  }

  async getClients(page: number = 1, limit: number = 10) {
    return this.client.get('/clients', { params: { page, limit } });
  }

  async getClientById(clientId: string) {
    return this.client.get(`/clients/${clientId}`);
  }

  async updateClient(clientId: string, data: any) {
    return this.client.put(`/clients/${clientId}`, data);
  }

  async deleteClient(clientId: string) {
    return this.client.delete(`/clients/${clientId}`);
  }

  // Invoice endpoints
  async createInvoice(invoiceData: any) {
    return this.client.post('/invoices', invoiceData);
  }

  async getInvoices(page: number = 1, limit: number = 10, status?: string) {
    return this.client.get('/invoices', { params: { page, limit, status } });
  }

  async getInvoiceById(invoiceId: string) {
    return this.client.get(`/invoices/${invoiceId}`);
  }

  async updateInvoice(invoiceId: string, data: any) {
    return this.client.put(`/invoices/${invoiceId}`, data);
  }

  async sendInvoice(invoiceId: string) {
    return this.client.post(`/invoices/${invoiceId}/send`);
  }

  async recordPayment(invoiceId: string, amount: number) {
    return this.client.post(`/invoices/${invoiceId}/payment`, { amount });
  }

  async sendReminder(invoiceId: string) {
    return this.client.post(`/invoices/${invoiceId}/reminder`);
  }

  async getOverdueInvoices() {
    return this.client.get('/invoices/status/overdue');
  }

  // Dashboard endpoints
  async getDashboardMetrics() {
    return this.client.get('/dashboard/metrics');
  }

  async getRecentActivity(limit: number = 10) {
    return this.client.get('/dashboard/activity', { params: { limit } });
  }

  async getCashflowForecast() {
    return this.client.get('/dashboard/forecast');
  }

  async getClientPerformance() {
    return this.client.get('/dashboard/clients/performance');
  }
}

export default new ApiClient();
