import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:5000/api/auth';

  useEffect(() => {
    // Check for existing session on mount
    const checkLoggedUser = async () => {
      const token = localStorage.getItem('openlearn_token');
      if (token) {
        try {
          const res = await fetch(`${API_URL}/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            localStorage.removeItem('openlearn_token');
          }
        } catch (err) {
          console.error("Failed to fetch user session", err);
          localStorage.removeItem('openlearn_token');
        }
      }
      setLoading(false);
    };

    checkLoggedUser();
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('openlearn_token', data.token);

      // Fetch user profile immediately after registering
      const userRes = await fetch(`${API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      const userData = await userRes.json();
      setUser(userData);

      return userData;
    } catch (err) {
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('openlearn_token', data.token);

      // Fetch user profile immediately after login
      const userRes = await fetch(`${API_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      const userData = await userRes.json();
      setUser(userData);

      return userData;
    } catch (err) {
      throw err;
    }
  };

  const upgradeToPremium = async () => {
    try {
      const token = localStorage.getItem('openlearn_token');
      if (!token) throw new Error('No token found');

      const res = await fetch(`${API_URL}/upgrade`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedUser = await res.json();

      if (!res.ok) {
        throw new Error(updatedUser.message || 'Upgrade failed');
      }

      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  const cancelSubscription = async () => {
    try {
      const token = localStorage.getItem('openlearn_token');
      if (!token) throw new Error('No token found');

      const res = await fetch(`${API_URL}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedUser = await res.json();

      if (!res.ok) {
        throw new Error(updatedUser.message || 'Cancellation failed');
      }

      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('openlearn_token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    upgradeToPremium,
    cancelSubscription,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
