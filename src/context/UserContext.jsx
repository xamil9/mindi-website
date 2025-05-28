import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored user session
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const signIn = (userData) => {
        // Validate user data includes role information
        const user = {
            ...userData,
            isFilmmaker: userData.isFilmmaker || false,
            films: userData.films || [], // Array of film IDs this filmmaker owns
        };
        
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const signOut = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateUserRole = (isFilmmaker, films = []) => {
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                isFilmmaker,
                films
            };
            setCurrentUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
    };

    return (
        <UserContext.Provider value={{
            currentUser,
            loading,
            signIn,
            signOut,
            updateUserRole,
            isFilmmaker: currentUser?.isFilmmaker || false,
            userFilms: currentUser?.films || []
        }}>
            {children}
        </UserContext.Provider>
    );
};