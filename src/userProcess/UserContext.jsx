import { createContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth.api';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const validateSession = async () => {
            try {
                setIsLoading(true);
                const token = localStorage.getItem('token');

                if (!token) {
                    setUser(null);
                    return;
                }

                // Call /auth/me to get current user data
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error('Session validation failed:', error);
                // Token is invalid or expired, clear it
                localStorage.removeItem('token');
                setUser(null);
                // Don't redirect here, let components handle it with useAuth hook
            } finally {
                setIsLoading(false);
            }
        };

        validateSession();
    }, [location]);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const login = (token, userData = null) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, login, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}
