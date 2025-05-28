// src/components/FilmmakerDashboard/hooks/useFilmData.js
import { useState, useCallback } from 'react';

export const useFilmData = (filmId) => {
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const [pricingTiers, setPricingTiers] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [btsPictures, setBtsPictures] = useState([]);
    const [commentaryTracks, setCommentaryTracks] = useState([]);
    const [hotspots, setHotspots] = useState([]);
    const [exportQueue, setExportQueue] = useState([]);
    const [directorNotes, setDirectorNotes] = useState('');
    const [filmPoster, setFilmPoster] = useState(null);
    const [aboutInfo, setAboutInfo] = useState({
        synopsis: '',
        genre: 'Drama',
        language: 'English',
        duration: '',
        year: '2024',
        cast: []
    });
    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            name: 'Early Access Pass',
            type: 'Early Access',
            description: 'Get exclusive access 7 days before general release',
            originalPrice: 19.99,
            campaignPrice: 14.99,
            status: 'active',
            sold: 23,
            endsIn: '4 days'
        },
        {
            id: 2,
            name: 'Live Premiere Event',
            type: 'Premiere Event',
            description: 'Virtual premiere with live Q&A session',
            price: 24.99,
            status: 'scheduled',
            date: 'June 15, 8PM EST',
            registered: 0
        }
    ]);
    const [loading, setLoading] = useState(false);

    const loadFilmData = useCallback(async () => {
        setLoading(true);
        try {
            // Simulated API calls
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSelectedFilm({
                id: filmId,
                title: 'My Amazing Film',
                synopsis: 'A compelling story about...',
                genre: 'Drama',
                language: 'English',
                duration: '98',
                year: '2024',
                cast: ['Actor 1', 'Actor 2']
            });

            setAnnotations([
                {
                    id: 1,
                    userId: 1,
                    User: { name: 'John Doe' },
                    timestamp: 120,
                    type: 'director',
                    content: 'This scene represents the turning point',
                    likes: 45,
                    replies: []
                }
            ]);

            setPricingTiers([
                {
                    id: 1,
                    name: 'Weekend Rental',
                    type: 'rental',
                    price: 4.99,
                    duration: 48,
                    isActive: true,
                    features: ['HD Quality', 'Offline Download'],
                    activeUsers: 142
                },
                {
                    id: 2,
                    name: 'Own Forever',
                    type: 'purchase',
                    price: 14.99,
                    isActive: true,
                    features: ['4K Quality', 'Offline Download', 'Bonus Content'],
                    activeUsers: 38
                }
            ]);

            setTrailers([
                { id: 1, title: 'Official Trailer', duration: '2:31', uploadedAt: '3 days ago', url: 'trailer1.mp4' },
                { id: 2, title: 'Teaser Trailer', duration: '1:02', uploadedAt: '1 week ago', url: 'teaser.mp4' }
            ]);

            setBtsPictures([1, 2, 3, 4, 5, 6, 7, 8]);

            setCommentaryTracks([
                {
                    id: 1,
                    title: 'Director Commentary',
                    speakerNames: ['John Director', 'Jane Producer'],
                    isDefault: true,
                    duration: '98:00',
                    audioFile: 'commentary1.mp3'
                }
            ]);

            setHotspots([
                {
                    id: 1,
                    type: 'info',
                    startTime: 120,
                    endTime: 130,
                    content: {
                        title: 'Behind the Scene',
                        description: 'This location was filmed in...',
                        link: ''
                    },
                    clicks: 234
                }
            ]);

            setExportQueue([
                {
                    id: 1,
                    name: 'Sundance Festival Package',
                    createdAt: '2 days ago',
                    status: 'completed',
                    downloadUrl: '#',
                    fileSize: '2.4 GB'
                }
            ]);
        } catch (error) {
            console.error('Error loading film data:', error);
        } finally {
            setLoading(false);
        }
    }, [filmId]);

    return {
        selectedFilm,
        setSelectedFilm,
        annotations,
        setAnnotations,
        pricingTiers,
        setPricingTiers,
        trailers,
        setTrailers,
        btsPictures,
        setBtsPictures,
        commentaryTracks,
        setCommentaryTracks,
        hotspots,
        setHotspots,
        exportQueue,
        setExportQueue,
        directorNotes,
        setDirectorNotes,
        filmPoster,
        setFilmPoster,
        aboutInfo,
        setAboutInfo,
        campaigns,
        setCampaigns,
        loading,
        loadFilmData
    };
};