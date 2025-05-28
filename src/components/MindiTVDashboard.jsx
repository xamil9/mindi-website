import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users, Play, DollarSign, Globe, Share2, Settings, Film, UserPlus, Eye, TrendingUp, Copy, Check, X, Upload, Plus, Trash2, LogOut } from 'lucide-react';
import ApiService from '../services/api';

const MindiTVDashboard = () => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [copiedLink, setCopiedLink] = useState('');
    const [expandedStat, setExpandedStat] = useState(null);
    const [showAddFilmModal, setShowAddFilmModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Real data from API
    const [analyticsData, setAnalyticsData] = useState(null);
    const [filmsData, setFilmsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [referralsData, setReferralsData] = useState([]);

    const breakdownRef = useRef(null);
    const userMenuRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        synopsis: '',
        genre: '',
        duration: '',
        releaseYear: '',
        language: '',
        director: '',
        producers: '',
        cast: '',
        writers: '',
        cinematographer: '',
        musicComposer: '',
        rating: '',
        tags: ''
    });

    const [files, setFiles] = useState({
        movie: null,
        poster: null,
        stillImages: [],
        subtitles: []
    });

    // Fetch all data when component mounts
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        setError(null);

        try {
            const [analytics, films, users, referrals] = await Promise.all([
                ApiService.getAnalytics(),
                ApiService.getFilms({ limit: 20 }),
                ApiService.getUsers({ limit: 20 }),
                ApiService.getReferrals({ limit: 20 })
            ]);

            setAnalyticsData(analytics.data);
            setFilmsData(films.data);
            setUsersData(users.data);
            setReferralsData(referrals.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // Handle sign out
    const handleSignOut = () => {
        ApiService.logout();
        // Redirect to login page or reload
        window.location.href = '/';
    };

    // Handle click outside to close expanded view
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (expandedStat && breakdownRef.current && !breakdownRef.current.contains(event.target)) {
                setExpandedStat(null);
            }
        };

        if (expandedStat) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [expandedStat]);

    // Handle click outside to close user menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserMenu && userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [showUserMenu]);

    // Update film submission to use real API
    const handleSubmitFilm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();

            // Add text fields
            Object.keys(formData).forEach(key => {
                if (formData[key]) {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Add files
            if (files.movie) formDataToSend.append('movie', files.movie);
            if (files.poster) formDataToSend.append('poster', files.poster);
            files.stillImages.forEach(file => formDataToSend.append('stillImages', file));
            files.subtitles.forEach(file => formDataToSend.append('subtitles', file));

            const response = await ApiService.createFilm(formDataToSend);

            if (response.success) {
                setShowAddFilmModal(false);
                // Reset form
                setFormData({
                    title: '', synopsis: '', genre: '', duration: '', releaseYear: '',
                    language: '', director: '', producers: '', cast: '', writers: '',
                    cinematographer: '', musicComposer: '', rating: '', tags: ''
                });
                setFiles({ movie: null, poster: null, stillImages: [], subtitles: [] });

                // Refresh films data
                const updatedFilms = await ApiService.getFilms({ limit: 20 });
                setFilmsData(updatedFilms.data);
            }
        } catch (error) {
            console.error('Error creating film:', error);
            setError('Failed to create film');
        } finally {
            setLoading(false);
        }
    };

    // Loading state
    if (loading && !analyticsData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={fetchAllData}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Calculate breakdown data from real API data
    const breakdownData = analyticsData ? {
        views: {
            total: analyticsData.totalViews?.toLocaleString() || '0',
            paid: {
                value: Math.floor(analyticsData.totalViews * 0.61)?.toLocaleString() || '0',
                percentage: 61,
                change: 15.2
            },
            free: {
                value: Math.floor(analyticsData.totalViews * 0.39)?.toLocaleString() || '0',
                percentage: 39,
                change: 8.1
            }
        },
        users: {
            total: analyticsData.activeUsers?.toLocaleString() || '0',
            paid: {
                value: Math.floor(analyticsData.activeUsers * 0.42)?.toLocaleString() || '0',
                percentage: 42,
                change: 12.8
            },
            free: {
                value: Math.floor(analyticsData.activeUsers * 0.58)?.toLocaleString() || '0',
                percentage: 58,
                change: 5.4
            }
        },
        revenue: {
            total: `$${analyticsData.revenue || '0'}`,
            paid: {
                value: `$${(parseFloat(analyticsData.revenue || 0) * 0.87).toFixed(2)}`,
                percentage: 87,
                change: -2.1
            },
            free: {
                value: `$${(parseFloat(analyticsData.revenue || 0) * 0.13).toFixed(2)}`,
                percentage: 13,
                change: -8.5
            }
        }
    } : {
        views: {
            total: '46.5K',
            paid: { value: '28.2K', percentage: 61, change: 15.2 },
            free: { value: '18.3K', percentage: 39, change: 8.1 }
        },
        users: {
            total: '2,341',
            paid: { value: '987', percentage: 42, change: 12.8 },
            free: { value: '1,354', percentage: 58, change: 5.4 }
        },
        revenue: {
            total: '$12,846',
            paid: { value: '$11,230', percentage: 87, change: -2.1 },
            free: { value: '$1,616', percentage: 13, change: -8.5 }
        }
    };

    // Mock data for analytics
    const viewershipData = [
        { month: 'Jan', views: 1200, revenue: 2400 },
        { month: 'Feb', views: 1900, revenue: 3800 },
        { month: 'Mar', views: 3000, revenue: 6000 },
        { month: 'Apr', views: 2800, revenue: 5600 },
        { month: 'May', views: 4200, revenue: 8400 },
        { month: 'Jun', views: 3800, revenue: 7600 }
    ];

    const countryData = [
        { country: 'United States', views: 2500, percentage: 35 },
        { country: 'United Kingdom', views: 1800, percentage: 25 },
        { country: 'Canada', views: 1200, percentage: 17 },
        { country: 'Australia', views: 900, percentage: 13 },
        { country: 'Germany', views: 700, percentage: 10 }
    ];

    const pieData = [
        { name: 'Mobile', value: 45, color: '#2563eb' },
        { name: 'Desktop', value: 35, color: '#ea580c' },
        { name: 'Tablet', value: 15, color: '#3b82f6' },
        { name: 'TV', value: 5, color: '#fb923c' }
    ];

    const films = [
        { id: 1, title: 'Ocean Stories', views: 15420, revenue: 3088, status: 'Published', uploadDate: '2024-03-15' },
        { id: 2, title: 'Digital Nomad Life', views: 8950, revenue: 1790, status: 'Published', uploadDate: '2024-04-02' },
        { id: 3, title: 'Climate Change Documentary', views: 22100, revenue: 4420, status: 'Published', uploadDate: '2024-02-28' },
        { id: 4, title: 'Tech Innovation Series', views: 0, revenue: 0, status: 'Draft', uploadDate: '2024-05-10' }
    ];

    const referrals = [
        { id: 1, user: 'Alex Johnson', code: 'AJ2024', clicks: 245, conversions: 23, earnings: 460, status: 'Active' },
        { id: 2, user: 'Sarah Chen', code: 'SC2024', clicks: 189, conversions: 18, earnings: 360, status: 'Active' },
        { id: 3, user: 'Mike Rodriguez', code: 'MR2024', clicks: 156, conversions: 12, earnings: 240, status: 'Active' },
        { id: 4, user: 'Emma Wilson', code: 'EW2024', clicks: 98, conversions: 8, earnings: 160, status: 'Pending' }
    ];

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2024-01-15', watchTime: '24h 32m', status: 'Premium' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2024-02-08', watchTime: '18h 45m', status: 'Free' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joined: '2024-03-22', watchTime: '31h 12m', status: 'Premium' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', joined: '2024-04-10', watchTime: '12h 03m', status: 'Free' }
    ];

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedLink(id);
        setTimeout(() => setCopiedLink(''), 2000);
    };

    const generateReferralLink = (code) => {
        return `https://mindi.tv/ref/${code}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (type, file) => {
        if (type === 'stillImages' || type === 'subtitles') {
            setFiles(prev => ({
                ...prev,
                [type]: [...prev[type], file]
            }));
        } else {
            setFiles(prev => ({
                ...prev,
                [type]: file
            }));
        }
    };

    const removeFile = (type, index) => {
        if (type === 'stillImages' || type === 'subtitles') {
            setFiles(prev => ({
                ...prev,
                [type]: prev[type].filter((_, i) => i !== index)
            }));
        } else {
            setFiles(prev => ({
                ...prev,
                [type]: null
            }));
        }
    };

    const StatCard = ({ icon: Icon, title, value, change, color, statKey, isClickable = false }) => (
        <div
            className={`bg-white p-6 rounded-lg shadow-sm border transition-all duration-200 ${isClickable ? 'cursor-pointer hover:shadow-md hover:border-blue-300' : ''
                } ${expandedStat === statKey ? 'ring-2 ring-blue-500' : ''}`}
            onClick={isClickable ? () => setExpandedStat(expandedStat === statKey ? null : statKey) : undefined}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {change && (
                        <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change > 0 ? '+' : ''}{change}% from last month
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    );

    const BreakdownCard = ({ statKey }) => {
        const data = breakdownData[statKey];
        if (!data) return null;

        return (
            <div ref={breakdownRef} className="bg-white p-6 rounded-lg shadow-sm border border-blue-200 relative">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold capitalize">{statKey} Breakdown</h4>
                    <button
                        onClick={() => setExpandedStat(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-700">Premium Users</span>
                            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                                {data.paid.percentage}%
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900">{data.paid.value}</p>
                        <p className={`text-sm ${data.paid.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.paid.change > 0 ? '+' : ''}{data.paid.change}% from last month
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-orange-700">Free Users</span>
                            <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                                {data.free.percentage}%
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-orange-900">{data.free.value}</p>
                        <p className={`text-sm ${data.free.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.free.change > 0 ? '+' : ''}{data.free.change}% from last month
                        </p>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Insights</h5>
                    <div className="text-sm text-blue-800 space-y-1">
                        {statKey === 'views' && (
                            <>
                                <p>• Premium users generate 61% of total views with higher engagement</p>
                                <p>• Free users show strong growth potential for conversion</p>
                            </>
                        )}
                        {statKey === 'users' && (
                            <>
                                <p>• 42% premium conversion rate indicates strong value proposition</p>
                                <p>• Free user growth provides healthy funnel for premium upgrades</p>
                            </>
                        )}
                        {statKey === 'revenue' && (
                            <>
                                <p>• Premium subscriptions drive 87% of total revenue</p>
                                <p>• Ad revenue from free users provides additional income stream</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const AddFilmModal = () => (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showAddFilmModal ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-blue-900">Add New Film</h2>
                    <button
                        onClick={() => setShowAddFilmModal(false)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmitFilm} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Film Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                            <select
                                name="genre"
                                value={formData.genre}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Genre</option>
                                <option value="documentary">Documentary</option>
                                <option value="drama">Drama</option>
                                <option value="comedy">Comedy</option>
                                <option value="action">Action</option>
                                <option value="thriller">Thriller</option>
                                <option value="horror">Horror</option>
                                <option value="romance">Romance</option>
                                <option value="sci-fi">Sci-Fi</option>
                                <option value="animation">Animation</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Release Year</label>
                            <input
                                type="number"
                                name="releaseYear"
                                value={formData.releaseYear}
                                onChange={handleInputChange}
                                min="1900"
                                max="2030"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <input
                                type="text"
                                name="language"
                                value={formData.language}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Rating</option>
                                <option value="G">G - General Audiences</option>
                                <option value="PG">PG - Parental Guidance</option>
                                <option value="PG-13">PG-13 - Parents Strongly Cautioned</option>
                                <option value="R">R - Restricted</option>
                                <option value="NC-17">NC-17 - Adults Only</option>
                                <option value="NR">NR - Not Rated</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Synopsis</label>
                        <textarea
                            name="synopsis"
                            value={formData.synopsis}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter film synopsis..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Director</label>
                            <input
                                type="text"
                                name="director"
                                value={formData.director}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Producers</label>
                            <input
                                type="text"
                                name="producers"
                                value={formData.producers}
                                onChange={handleInputChange}
                                placeholder="Separate multiple producers with commas"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cast</label>
                            <input
                                type="text"
                                name="cast"
                                value={formData.cast}
                                onChange={handleInputChange}
                                placeholder="Separate multiple cast members with commas"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Writers</label>
                            <input
                                type="text"
                                name="writers"
                                value={formData.writers}
                                onChange={handleInputChange}
                                placeholder="Separate multiple writers with commas"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cinematographer</label>
                            <input
                                type="text"
                                name="cinematographer"
                                value={formData.cinematographer}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Music Composer</label>
                            <input
                                type="text"
                                name="musicComposer"
                                value={formData.musicComposer}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder="Enter tags separated by commas (e.g. independent, award-winning, festival)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="space-y-6 border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-900">File Uploads</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Movie File *</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                                {files.movie ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{files.movie.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile('movie')}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <div className="text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">
                                                Click to upload movie file (MP4, MOV, AVI)
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".mp4,.mov,.avi,.mkv"
                                            onChange={(e) => handleFileUpload('movie', e.target.files[0])}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Movie Poster *</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                                {files.poster ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{files.poster.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile('poster')}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <div className="text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">
                                                Click to upload poster image (JPG, PNG)
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".jpg,.jpeg,.png,.webp"
                                            onChange={(e) => handleFileUpload('poster', e.target.files[0])}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Still Images</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
                                <label className="cursor-pointer">
                                    <div className="text-center">
                                        <Plus className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">
                                            Click to add still images (JPG, PNG)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".jpg,.jpeg,.png,.webp"
                                        multiple
                                        onChange={(e) => {
                                            Array.from(e.target.files).forEach(file =>
                                                handleFileUpload('stillImages', file)
                                            );
                                        }}
                                    />
                                </label>
                                {files.stillImages.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {files.stillImages.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between bg-orange-50 p-2 rounded">
                                                <span className="text-sm text-gray-600">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile('stillImages', index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle Files (.srt)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
                                <label className="cursor-pointer">
                                    <div className="text-center">
                                        <Plus className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">
                                            Click to add subtitle files (.srt)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept=".srt"
                                        multiple
                                        onChange={(e) => {
                                            Array.from(e.target.files).forEach(file =>
                                                handleFileUpload('subtitles', file)
                                            );
                                        }}
                                    />
                                </label>
                                {files.subtitles.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {files.subtitles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                                                <span className="text-sm text-gray-600">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile('subtitles', index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => setShowAddFilmModal(false)}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Film className="h-4 w-4" />
                            Add Film
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const AnalyticsDashboard = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ease-in-out">
                {!expandedStat ? (
                    <>
                        <StatCard
                            icon={Eye}
                            title="Total Views"
                            value="46.5K"
                            change={12.5}
                            color="bg-blue-600"
                            statKey="views"
                            isClickable={true}
                        />
                        <StatCard
                            icon={Users}
                            title="Active Users"
                            value="2,341"
                            change={8.2}
                            color="bg-orange-500"
                            statKey="users"
                            isClickable={true}
                        />
                        <StatCard
                            icon={DollarSign}
                            title="Revenue"
                            value="$12,846"
                            change={-3.1}
                            color="bg-blue-500"
                            statKey="revenue"
                            isClickable={true}
                        />
                        <StatCard
                            icon={TrendingUp}
                            title="Conversion Rate"
                            value="4.2%"
                            change={1.8}
                            color="bg-orange-600"
                        />
                    </>
                ) : (
                    <div className="lg:col-span-4 md:col-span-2 col-span-1 animate-in fade-in duration-500">
                        <BreakdownCard statKey={expandedStat} />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Views & Revenue Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={viewershipData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={2} />
                            <Line type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-4">Device Usage</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center mt-4 gap-4">
                        {pieData.map((entry, index) => (
                            <div key={index} className="flex items-center">
                                <div
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: entry.color }}
                                ></div>
                                <span className="text-sm">{entry.name}: {entry.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={countryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    const AdminPanel = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Content Management</h2>
                <button
                    onClick={() => setShowAddFilmModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <Film className="h-4 w-4" />
                    Add New Film
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Films</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {films.map((film) => (
                                <tr key={film.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{film.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{film.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${film.revenue}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${film.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {film.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{film.uploadDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">User Management</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Watch Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.watchTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Premium' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button className="text-red-600 hover:text-red-900">Suspend</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const ReferralSystem = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Referral System</h2>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Generate New Code
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={Share2}
                    title="Total Referrals"
                    value="688"
                    change={15.3}
                    color="bg-blue-600"
                />
                <StatCard
                    icon={DollarSign}
                    title="Referral Revenue"
                    value="$1,220"
                    change={22.1}
                    color="bg-orange-500"
                />
                <StatCard
                    icon={TrendingUp}
                    title="Conversion Rate"
                    value="8.9%"
                    change={-2.4}
                    color="bg-blue-500"
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Active Referrers</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {referrals.map((referral) => (
                                <tr key={referral.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{referral.user}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{referral.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <span className="truncate max-w-32">{generateReferralLink(referral.code)}</span>
                                            <button
                                                onClick={() => copyToClipboard(generateReferralLink(referral.code), referral.id)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                {copiedLink === referral.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referral.clicks}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referral.conversions}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${referral.earnings}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${referral.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {referral.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Disable</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">Referral Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={referrals}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="user" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="clicks" fill="#2563eb" name="Clicks" />
                        <Bar dataKey="conversions" fill="#ea580c" name="Conversions" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <AddFilmModal />
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-blue-900">Mindi.TV Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium hover:bg-orange-600 transition-colors"
                                >
                                    A
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">Admin User</p>
                                            <p className="text-xs text-gray-500">admin@mindi.tv</p>
                                        </div>
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    <div className="w-64 flex-shrink-0">
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('analytics')}
                                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg ${activeTab === 'analytics' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <TrendingUp className="h-5 w-5" />
                                Analytics
                            </button>
                            <button
                                onClick={() => setActiveTab('admin')}
                                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg ${activeTab === 'admin' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Settings className="h-5 w-5" />
                                Admin Panel
                            </button>
                            <button
                                onClick={() => setActiveTab('referrals')}
                                className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg ${activeTab === 'referrals' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Share2 className="h-5 w-5" />
                                Referrals
                            </button>
                        </nav>
                    </div>

                    <div className="flex-1">
                        {activeTab === 'analytics' && <AnalyticsDashboard />}
                        {activeTab === 'admin' && <AdminPanel />}
                        {activeTab === 'referrals' && <ReferralSystem />}
                    </div>
                </div>
            </div>

            {/* Dashboard Footer */}
            <div className="bg-gray-50 border-t mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="text-center text-sm text-gray-500">
                        © 2025 Mindi TV. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MindiTVDashboard;