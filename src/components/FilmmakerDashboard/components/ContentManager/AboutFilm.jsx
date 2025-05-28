// src/components/FilmmakerDashboard/components/ContentManager/AboutFilm.jsx
import React, { useState } from 'react';
import { Image, Edit, Trash2, Plus, Save, Loader, Video, Film, Loader2, X } from 'lucide-react';
import { showNotification } from '../../utils/helpers';

const AboutFilm = ({
    selectedFilm,
    aboutInfo,
    setAboutInfo,
    filmPoster,
    setFilmPoster,
    handleVideoUpload,
    updateFilm,
    uploadProgress
}) => {
    const [uploadingPoster, setUploadingPoster] = useState(false);
    const [loading, setLoading] = useState(false);
    const [customGenreInput, setCustomGenreInput] = useState('');
    const [showCustomGenreInput, setShowCustomGenreInput] = useState(false);

    // Predefined genres
    const predefinedGenres = [
        'Drama', 'Comedy', 'Action', 'Thriller', 'Documentary',
        'Horror', 'Romance', 'Sci-Fi', 'Fantasy', 'Mystery',
        'Animation', 'Adventure', 'Crime', 'Western', 'Musical',
        'War', 'Biography', 'History', 'Sport', 'Family'
    ];

    const handlePosterUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingPoster(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const posterUrl = URL.createObjectURL(file);
            setFilmPoster(posterUrl);
            showNotification('Poster uploaded successfully!', 'success');
        } catch (error) {
            console.error('Error uploading poster:', error);
            showNotification('Failed to upload poster', 'error');
        } finally {
            setUploadingPoster(false);
        }
    };

    const handleDeletePoster = () => {
        if (window.confirm('Are you sure you want to remove the poster?')) {
            setFilmPoster(null);
        }
    };

    const handleSaveAboutInfo = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // API call would go here
            showNotification('Film information saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving film info:', error);
            showNotification('Failed to save film information', 'error');
        } finally {
            setLoading(false);
        }
    };

    const toggleGenre = (genre) => {
        const currentGenres = aboutInfo.genres || [];
        if (currentGenres.includes(genre)) {
            setAboutInfo({
                ...aboutInfo,
                genres: currentGenres.filter(g => g !== genre)
            });
        } else {
            setAboutInfo({
                ...aboutInfo,
                genres: [...currentGenres, genre]
            });
        }
    };

    const addCustomGenre = () => {
        if (customGenreInput.trim()) {
            const currentGenres = aboutInfo.genres || [];
            if (!currentGenres.includes(customGenreInput.trim())) {
                setAboutInfo({
                    ...aboutInfo,
                    genres: [...currentGenres, customGenreInput.trim()]
                });
            }
            setCustomGenreInput('');
            setShowCustomGenreInput(false);
        }
    };

    const removeGenre = (genre) => {
        setAboutInfo({
            ...aboutInfo,
            genres: (aboutInfo.genres || []).filter(g => g !== genre)
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-6">Film Information</h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Film Poster Section */}
                    <div className="lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Film Poster
                        </label>
                        <div className="relative">
                            {filmPoster ? (
                                <div className="relative group">
                                    <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src={filmPoster}
                                            alt="Film Poster"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                        <label className="p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-100">
                                            <Edit className="h-5 w-5" />
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handlePosterUpload}
                                                disabled={uploadingPoster}
                                            />
                                        </label>
                                        <button
                                            onClick={handleDeletePoster}
                                            className="p-2 bg-white rounded-lg hover:bg-gray-100"
                                        >
                                            <Trash2 className="h-5 w-5 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="aspect-[2/3] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                                    {uploadingPoster ? (
                                        <Loader className="h-8 w-8 animate-spin text-gray-400" />
                                    ) : (
                                        <>
                                            <Image className="h-12 w-12 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-600">Upload Poster</span>
                                            <span className="text-xs text-gray-500 mt-1">2:3 ratio recommended</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePosterUpload}
                                        disabled={uploadingPoster}
                                    />
                                </label>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Recommended: 1000x1500px minimum
                        </p>

                        {/* Film Video Upload Section */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Film Video
                            </label>
                            <div className="relative">
                                {selectedFilm?.videoUrl ? (
                                    <div className="relative group">
                                        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                                            <div className="w-full h-full flex items-center justify-center text-white">
                                                <div className="text-center">
                                                    <Film className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                    <p className="text-sm">Film uploaded</p>
                                                    <p className="text-xs opacity-75 mt-1">Ready to stream</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                            <label className="p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-100">
                                                <Edit className="h-5 w-5" />
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="video/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file && handleVideoUpload) {
                                                            handleVideoUpload(file, 'main');
                                                        }
                                                    }}
                                                    disabled={uploadProgress?.main !== undefined && uploadProgress.main < 100}
                                                />
                                            </label>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to remove the film?') && updateFilm) {
                                                        updateFilm({ videoUrl: null });
                                                    }
                                                }}
                                                className="p-2 bg-white rounded-lg hover:bg-gray-100"
                                            >
                                                <Trash2 className="h-5 w-5 text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                                        {uploadProgress?.main !== undefined && uploadProgress.main < 100 ? (
                                            <>
                                                <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
                                                <span className="text-sm text-gray-600">Uploading... {Math.round(uploadProgress.main)}%</span>
                                                <div className="w-full max-w-xs mt-2">
                                                    <div className="bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${uploadProgress.main}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Video className="h-12 w-12 text-gray-400 mb-2" />
                                                <span className="text-sm text-gray-600">Upload Film</span>
                                                <span className="text-xs text-gray-500 mt-1">MP4, MOV, AVI</span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="video/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file && handleVideoUpload) {
                                                    handleVideoUpload(file, 'main');
                                                }
                                            }}
                                            disabled={uploadProgress?.main !== undefined && uploadProgress.main < 100}
                                        />
                                    </label>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Max file size: 15GB
                            </p>
                        </div>
                    </div>

                    {/* Film Details Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Film Title
                                </label>
                                <input
                                    type="text"
                                    value={selectedFilm?.title || ''}
                                    onChange={(e) => setAboutInfo({ ...aboutInfo, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter film title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Release Year
                                </label>
                                <input
                                    type="number"
                                    value={aboutInfo.year}
                                    onChange={(e) => setAboutInfo({ ...aboutInfo, year: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="2024"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={aboutInfo.duration}
                                    onChange={(e) => setAboutInfo({ ...aboutInfo, duration: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="98"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Language
                                </label>
                                <input
                                    type="text"
                                    value={aboutInfo.language}
                                    onChange={(e) => setAboutInfo({ ...aboutInfo, language: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="English"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Director
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Director name"
                                />
                            </div>
                        </div>

                        {/* Multi-Genre Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Genres (Select Multiple)
                            </label>

                            {/* Selected Genres */}
                            {aboutInfo.genres && aboutInfo.genres.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {aboutInfo.genres.map((genre) => (
                                        <span
                                            key={genre}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                        >
                                            {genre}
                                            <button
                                                onClick={() => removeGenre(genre)}
                                                className="hover:text-blue-900"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Genre Options */}
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-3">
                                {predefinedGenres.map((genre) => (
                                    <button
                                        key={genre}
                                        onClick={() => toggleGenre(genre)}
                                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${aboutInfo.genres?.includes(genre)
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>

                            {/* Custom Genre Input */}
                            {showCustomGenreInput ? (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={customGenreInput}
                                        onChange={(e) => setCustomGenreInput(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                addCustomGenre();
                                            }
                                        }}
                                        placeholder="Enter custom genre"
                                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        autoFocus
                                    />
                                    <button
                                        onClick={addCustomGenre}
                                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowCustomGenreInput(false);
                                            setCustomGenreInput('');
                                        }}
                                        className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowCustomGenreInput(true)}
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Custom Genre
                                </button>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Synopsis
                            </label>
                            <textarea
                                value={aboutInfo.synopsis}
                                onChange={(e) => setAboutInfo({ ...aboutInfo, synopsis: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                                placeholder="Enter a compelling synopsis for your film..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cast Members
                            </label>
                            <div className="space-y-2">
                                {aboutInfo.cast.map((member, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={member}
                                            onChange={(e) => {
                                                const newCast = [...aboutInfo.cast];
                                                newCast[idx] = e.target.value;
                                                setAboutInfo({ ...aboutInfo, cast: newCast });
                                            }}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                            placeholder="Actor name"
                                        />
                                        <button
                                            onClick={() => {
                                                const newCast = aboutInfo.cast.filter((_, i) => i !== idx);
                                                setAboutInfo({ ...aboutInfo, cast: newCast });
                                            }}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setAboutInfo({ ...aboutInfo, cast: [...aboutInfo.cast, ''] })}
                                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Cast Member
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSaveAboutInfo}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutFilm;