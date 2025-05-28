import React, { useState, useContext, createContext, useEffect } from 'react';

const FilmDataContext = createContext();

export const useFilmData = () => {
    const context = useContext(FilmDataContext);
    if (!context) {
        throw new Error('useFilmData must be used within FilmDataProvider');
    }
    return context;
};

export const FilmDataProvider = ({ children }) => {
    const [films, setFilms] = useState({});
    const [loading, setLoading] = useState(true);

    // Load films from localStorage on mount
    useEffect(() => {
        const savedFilms = localStorage.getItem('films');
        if (savedFilms) {
            setFilms(JSON.parse(savedFilms));
        }
        setLoading(false);
    }, []);

    // Save films to localStorage whenever they change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('films', JSON.stringify(films));
        }
    }, [films, loading]);

    const updateFilm = (filmId, updates) => {
        setFilms(prev => ({
            ...prev,
            [filmId]: {
                ...prev[filmId],
                ...updates,
                lastUpdated: new Date().toISOString()
            }
        }));
    };

    const updateFilmTrailers = (filmId, trailers) => {
        setFilms(prev => ({
            ...prev,
            [filmId]: {
                ...prev[filmId],
                trailers,
                lastUpdated: new Date().toISOString()
            }
        }));
    };

    const updateFilmPhotos = (filmId, btsPictures) => {
        setFilms(prev => ({
            ...prev,
            [filmId]: {
                ...prev[filmId],
                btsPictures,
                lastUpdated: new Date().toISOString()
            }
        }));
    };

    const updateFilmAnnotations = (filmId, annotations) => {
        setFilms(prev => ({
            ...prev,
            [filmId]: {
                ...prev[filmId],
                annotations,
                lastUpdated: new Date().toISOString()
            }
        }));
    };

    const updateFilmPricing = (filmId, pricingTiers) => {
        setFilms(prev => ({
            ...prev,
            [filmId]: {
                ...prev[filmId],
                pricingTiers,
                lastUpdated: new Date().toISOString()
            }
        }));
    };

    const getFilm = (filmId) => {
        return films[filmId] || null;
    };

    const initializeFilm = (filmId, initialData) => {
        if (!films[filmId]) {
            setFilms(prev => ({
                ...prev,
                [filmId]: {
                    ...initialData,
                    id: filmId,
                    createdAt: new Date().toISOString(),
                    lastUpdated: new Date().toISOString()
                }
            }));
        }
    };

    return (
        <FilmDataContext.Provider value={{
            films,
            loading,
            updateFilm,
            getFilm,
            initializeFilm,
            updateFilmTrailers,
            updateFilmPhotos,
            updateFilmAnnotations,
            updateFilmPricing
        }}>
            {children}
        </FilmDataContext.Provider>
    );
};