import { useContext } from 'react';
import { UserContext } from './UserContext';

/**
 * Custom hook to access UserContext
 * Provides user, login, logout, and loading state
 */
export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};
