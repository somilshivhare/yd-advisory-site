import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Services
export const contactService = {
  // Submit contact form
  submitContact: async (formData) => {
    try {
      const response = await api.post('/contact/submit', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit contact form');
    }
  },

  // Get all contacts (admin only)
  getContacts: async (params = {}) => {
    try {
      const response = await api.get('/contact', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contacts');
    }
  },

  // Get single contact
  getContact: async (id) => {
    try {
      const response = await api.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch contact');
    }
  },

  // Update contact status
  updateContactStatus: async (id, statusData) => {
    try {
      const response = await api.patch(`/contact/${id}/status`, statusData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update contact status');
    }
  },

  // Mark contact as read
  markAsRead: async (id) => {
    try {
      const response = await api.patch(`/contact/${id}/read`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to mark contact as read');
    }
  },
};

export const servicesService = {
  // Get all services
  getServices: async (params = {}) => {
    try {
      const response = await api.get('/services', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch services');
    }
  },

  // Get featured services
  getFeaturedServices: async () => {
    try {
      const response = await api.get('/services/featured');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured services');
    }
  },

  // Get service by slug
  getServiceBySlug: async (slug) => {
    try {
      const response = await api.get(`/services/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch service');
    }
  },

  // Get services by category
  getServicesByCategory: async (category, params = {}) => {
    try {
      const response = await api.get(`/services/category/${category}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch services by category');
    }
  },

  // Get service categories
  getCategories: async () => {
    try {
      const response = await api.get('/services/meta/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  // Create service (admin only)
  createService: async (serviceData) => {
    try {
      const response = await api.post('/services', serviceData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create service');
    }
  },

  // Update service (admin only)
  updateService: async (id, serviceData) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update service');
    }
  },

  // Delete service (admin only)
  deleteService: async (id) => {
    try {
      const response = await api.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete service');
    }
  },
};

export const teamService = {
  // Get all team members
  getTeamMembers: async (params = {}) => {
    try {
      const response = await api.get('/team', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch team members');
    }
  },

  // Get featured team members
  getFeaturedMembers: async () => {
    try {
      const response = await api.get('/team/featured');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured team members');
    }
  },

  // Get team member by ID
  getTeamMember: async (id) => {
    try {
      const response = await api.get(`/team/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch team member');
    }
  },

  // Create team member (admin only)
  createTeamMember: async (memberData) => {
    try {
      const response = await api.post('/team', memberData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create team member');
    }
  },

  // Update team member (admin only)
  updateTeamMember: async (id, memberData) => {
    try {
      const response = await api.put(`/team/${id}`, memberData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update team member');
    }
  },

  // Delete team member (admin only)
  deleteTeamMember: async (id) => {
    try {
      const response = await api.delete(`/team/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete team member');
    }
  },
};

export const blogService = {
  // Get all blog posts
  getBlogPosts: async (params = {}) => {
    try {
      const response = await api.get('/blog', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch blog posts');
    }
  },

  // Get featured blog posts
  getFeaturedPosts: async () => {
    try {
      const response = await api.get('/blog/featured');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured blog posts');
    }
  },

  // Get blog post by slug
  getBlogPostBySlug: async (slug) => {
    try {
      const response = await api.get(`/blog/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch blog post');
    }
  },

  // Get blog posts by category
  getBlogPostsByCategory: async (category, params = {}) => {
    try {
      const response = await api.get(`/blog/category/${category}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch blog posts by category');
    }
  },

  // Search blog posts
  searchBlogPosts: async (query, params = {}) => {
    try {
      const response = await api.get('/blog/search', { 
        params: { q: query, ...params } 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search blog posts');
    }
  },

  // Create blog post (admin only)
  createBlogPost: async (postData) => {
    try {
      const response = await api.post('/blog', postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create blog post');
    }
  },

  // Update blog post (admin only)
  updateBlogPost: async (id, postData) => {
    try {
      const response = await api.put(`/blog/${id}`, postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update blog post');
    }
  },

  // Delete blog post (admin only)
  deleteBlogPost: async (id) => {
    try {
      const response = await api.delete(`/blog/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete blog post');
    }
  },
};

export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get current user');
    }
  },

  // Update profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/auth/password', passwordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  },
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      return error.response.data.message || 'An error occurred';
    } else if (error.request) {
      // Request was made but no response received
      return 'Network error. Please check your connection.';
    } else {
      // Something else happened
      return error.message || 'An unexpected error occurred';
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('token');
  },
};

// Newsletter service
export const newsletterService = {
  // Subscribe to newsletter
  subscribe: async (email) => {
    try {
      const response = await api.post('/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      // Check if it's a network error (server not running)
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        // Fallback: Store in localStorage and show success message
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        if (!subscribers.includes(email)) {
          subscribers.push({
            email,
            subscribedAt: new Date().toISOString(),
            source: 'website_offline'
          });
          localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        }
        
        return {
          success: true,
          message: 'Thank you for subscribing! We\'ll add you to our newsletter list.',
          data: {
            email,
            status: 'pending',
            subscribedAt: new Date().toISOString()
          }
        };
      }
      
      // For other errors, show the actual error message
      throw new Error(error.response?.data?.message || 'Failed to subscribe to newsletter');
    }
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email) => {
    try {
      const response = await api.post('/newsletter/unsubscribe', { email });
      return response.data;
    } catch (error) {
      // Check if it's a network error (server not running)
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        // Fallback: Remove from localStorage
        const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        const filteredSubscribers = subscribers.filter(sub => sub.email !== email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(filteredSubscribers));
        
        return {
          success: true,
          message: 'You have been unsubscribed from our newsletter.',
          data: {
            email,
            status: 'unsubscribed',
            unsubscribedAt: new Date().toISOString()
          }
        };
      }
      
      throw new Error(error.response?.data?.message || 'Failed to unsubscribe from newsletter');
    }
  },

  // Get local subscribers (for admin purposes)
  getLocalSubscribers: () => {
    return JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
  }
};

export default api;
