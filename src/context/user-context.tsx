import { getData } from '@root/utils/asyncStorage';
import { TAccount } from '@type/T-type';
import { createContext, useEffect, useState } from 'react';

export type UserContextType = {
    user?: TAccount;
    setUser?: (user: TAccount) => void;
};

export const UserContext = createContext<UserContextType>({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState<TAccount | null>(null);

    const handleSetUser = (user) => {
        setUser(user);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData({ item: 'user' });
            if (data != null) {
                setUser(JSON.parse(data));
            }
        };

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ user: user, setUser: handleSetUser }}>
            {children}
        </UserContext.Provider>
    );
};
