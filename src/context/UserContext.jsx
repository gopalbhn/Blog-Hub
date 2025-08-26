import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../url';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        getUser ();
    }, []);

    const getUser  = async () => {
        try {
            const res = await axios.get(`${URL}/api/auth/refetch`, { withCredentials: true });
            setUser (res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser , loading }}>
            {children}
        </UserContext.Provider>
    );
};
