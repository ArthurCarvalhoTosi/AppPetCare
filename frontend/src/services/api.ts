import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

// Configuração base da API
export const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Interceptor para adicionar token JWT
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Interceptor para tratamento de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout()
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// ===== AUTH =====
export const authApi = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),

    register: (data: {
        email: string
        password: string
        name: string
        phone?: string
        userType: number
    }) => api.post('/auth/register', data),

    refreshToken: () => api.post('/auth/refresh-token'),
}

// ===== VISITS =====
export const visitsApi = {
    getAll: () => api.get('/visits'),
    getById: (id: string) => api.get(`/visits/${id}`),
    create: (data: {
        petId: string
        caregiverId: string
        scheduledDate: string
        startTime: string
        endTime: string
        notes?: string
        address: string
    }) => api.post('/visits', data),
    updateStatus: (id: string, status: number) =>
        api.put(`/visits/${id}/status`, { status }),
    getCalendar: (startDate: string, endDate: string) =>
        api.get('/visits/calendar', { params: { startDate, endDate } }),
}

// ===== PETS =====
export const petsApi = {
    getAll: () => api.get('/pets'),
    getById: (id: string) => api.get(`/pets/${id}`),
    create: (data: {
        name: string
        type: number
        breed?: string
        ageInMonths?: number
        description?: string
        specialNeeds?: string
    }) => api.post('/pets', data),
    update: (id: string, data: Parameters<typeof petsApi.create>[0]) =>
        api.put(`/pets/${id}`, data),
    delete: (id: string) => api.delete(`/pets/${id}`),
}

// ===== CAREGIVERS =====
export const caregiversApi = {
    getAll: (filters?: { location?: string; petType?: number; maxRate?: number }) =>
        api.get('/caregivers', { params: filters }),
    getById: (id: string) => api.get(`/caregivers/${id}`),
    getAvailability: (id: string, startDate: string, endDate: string) =>
        api.get(`/caregivers/${id}/availability`, { params: { startDate, endDate } }),
    updateProfile: (data: {
        bio: string
        hourlyRate: number
        serviceArea?: string
        acceptedPetTypes: number[]
    }) => api.put('/caregivers/profile', data),
    setAvailability: (data: {
        dayOfWeek: number
        startTime: string
        endTime: string
        isRecurring: boolean
        specificDate?: string
    }) => api.post('/caregivers/availability', data),
}

// ===== REPORTS =====
export const reportsApi = {
    getByVisit: (visitId: string) => api.get(`/reports/visit/${visitId}`),
    create: (data: { visitId: string; content: string }) =>
        api.post('/reports', data),
    uploadImage: (reportId: string, file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        return api.post(`/reports/${reportId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },
}

// ===== CHAT =====
export const chatApi = {
    getConversations: () => api.get('/chat/conversations'),
    getMessages: (conversationId: string, page = 1, pageSize = 50) =>
        api.get(`/chat/conversations/${conversationId}/messages`, {
            params: { page, pageSize },
        }),
    sendMessage: (data: { receiverId: string; content: string; visitId?: string }) =>
        api.post('/chat/messages', data),
    markAsRead: (messageIds: string[]) =>
        api.put('/chat/messages/read', { messageIds }),
}
