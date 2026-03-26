const API_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseResponse = async (response, fallbackMessage) => {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || fallbackMessage);
  }

  return payload;
};

export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return parseResponse(response, 'Failed to register');
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    return parseResponse(response, 'Failed to login');
  },
};

export const userAPI = {
  getAllUsers: async () => {
    const response = await fetch(`${API_URL}/users`, {
      headers: getAuthHeaders(),
    });
    return parseResponse(response, 'Failed to fetch users');
  },

  getUserById: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: getAuthHeaders(),
    });
    return parseResponse(response, 'Failed to fetch user');
  },

  createUser: async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return parseResponse(response, 'Failed to create user');
  },

  updateUser: async (id, userData) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    return parseResponse(response, 'Failed to update user');
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return parseResponse(response, 'Failed to delete user');
  },
};
