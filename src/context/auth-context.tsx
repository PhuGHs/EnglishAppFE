import React, { createContext, useState, useEffect, useContext } from 'react';
import { getData, storeData, removeData } from '@root/utils/asyncStorage';

interface AuthContextType {
    token: string | null;
    signIn: (token: string) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await getData({ item: 'token' });
            if (storedToken) {
                setToken(storedToken);
            }
        };

        loadToken();
    }, [token]);

    const signIn = async (newToken: string) => {
        setToken(newToken);
        await storeData({ value: newToken, item: 'token' });
    };

    const signOut = async () => {
        setToken(null);
        await removeData({ item: 'token' });
    };

    return (
        <AuthContext.Provider value={{ token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
