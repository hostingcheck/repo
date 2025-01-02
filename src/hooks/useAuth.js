import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useApp } from '../context/AppContext';

const useAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user } = await authService.login(username, password);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.logout();
      setUser(null);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Failed to logout');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser, navigate]);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Implement session check logic here if needed
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    login,
    logout,
    isLoading,
    error
  };
};

export default useAuth;