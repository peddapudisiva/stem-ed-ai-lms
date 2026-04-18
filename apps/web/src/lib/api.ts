/**
 * STEM-ED AI — API Client
 * Centralized HTTP client for communicating with the backend API server.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Restore token from localStorage
    this.token = localStorage.getItem('stem_ed_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('stem_ed_token', token);
    } else {
      localStorage.removeItem('stem_ed_token');
    }
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    if (response.status === 204) return {} as T;
    return response.json();
  }

  // ── Auth ──
  async login(email: string, password: string) {
    const data = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    return data;
  }

  async getMe() {
    return this.request<any>('/auth/me');
  }

  logout() {
    this.setToken(null);
  }

  // ── Users ──
  async getUsers(params?: { role?: string; search?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<{ users: any[]; total: number }>(`/users${query ? `?${query}` : ''}`);
  }

  async getUser(id: string) {
    return this.request<any>(`/users/${id}`);
  }

  async updateUser(id: string, data: any) {
    return this.request<any>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteUser(id: string) {
    return this.request<void>(`/users/${id}`, { method: 'DELETE' });
  }

  // ── Courses ──
  async getCourses() {
    return this.request<{ courses: any[]; total: number }>('/courses');
  }

  async getCourse(id: string) {
    return this.request<any>(`/courses/${id}`);
  }

  async createCourse(data: any) {
    return this.request<any>('/courses', { method: 'POST', body: JSON.stringify(data) });
  }

  // ── Grades ──
  async getGrades(params?: { courseId?: string; studentId?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<{ grades: any[]; total: number }>(`/grades${query ? `?${query}` : ''}`);
  }

  async addGrade(data: any) {
    return this.request<any>('/grades', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateGrade(id: string, data: any) {
    return this.request<any>(`/grades/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  // ── Attendance ──
  async getAttendance(params?: { courseId?: string; date?: string; studentId?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request<{ attendance: any[]; total: number }>(`/attendance${query ? `?${query}` : ''}`);
  }

  async markAttendance(records: any[]) {
    return this.request<any>('/attendance', { method: 'POST', body: JSON.stringify({ records }) });
  }

  // ── Notifications ──
  async getNotifications() {
    return this.request<{ notifications: any[]; unread: number }>('/notifications');
  }

  async markNotificationRead(id: string) {
    return this.request<any>(`/notifications/${id}/read`, { method: 'PUT' });
  }

  async markAllNotificationsRead() {
    return this.request<any>('/notifications/read-all', { method: 'PUT' });
  }

  // ── Health ──
  async healthCheck() {
    return this.request<{ status: string; uptime: number; version: string }>('/health');
  }
}

// Singleton export
export const api = new ApiClient();
