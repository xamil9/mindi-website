// src/components/FilmmakerDashboard/components/ContentManager/TrailersVideos.jsx
import React, { useState } from 'react';
import { Upload, Video, PlayCircle, Edit, Trash2, Loader } from 'lucide-react';
import { showNotification } from '../../utils/helpers';

const TrailersVideos = ({ trailers, setTrailers, modals }) => {
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleVideoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingVideo(true);
        setUploadProgress(0);

        try {
            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);

            await new Promise(resolve => setTimeout(resolve, 2000));

            const newTrailer = {
                id: trailers.length + 1,
                title: file.name.replace(/\.[^/.]+$/, ""),
                duration: '0:00',
                uploadedAt: 'Just now',
                url: URL.createObjectURL(file)
            };

            setTrailers([...trailers, newTrailer]);
            showNotification('Video uploaded successfully!', 'success');
        } catch (error) {
            console.error('Error uploading video:', error);
            showNotification('Failed to upload video', 'error');
        } finally {
            setUploadingVideo(false);
            setUploadProgress(0);
        }
    };

    const handleDeleteTrailer = (trailerId) => {
        if (window.confirm('Are you sure you want to delete this trailer?')) {
            setTrailers(trailers.filter(t => t.id !== trailerId));
            showNotification('Trailer deleted successfully', 'success');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Trailers & Videos</h3>
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    Upload Video
                    <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        disabled={uploadingVideo}
                    />
                </label>
            </div>

            {uploadingVideo && (
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Uploading video...</span>
                        <span className="text-sm">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                </div>
            )}

            {trailers.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                    <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No Videos Uploaded</h4>
                    <p className="text-gray-600 mb-4">
                        Upload trailers, teasers, and behind-the-scenes videos
                    </p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                        <Upload className="h-4 w-4" />
                        Choose Video File
                        <input
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            disabled={uploadingVideo}
                        />
                    </label>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trailers.map((trailer) => (
                        <div key={trailer.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative group">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                                    {trailer.duration}
                                </span>
                            </div>
                            <h4 className="font-semibold mb-2">{trailer.title}</h4>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>Uploaded {trailer.uploadedAt}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            modals.setSelectedTrailer(trailer);
                                            modals.setShowTrailerEditModal(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <span>•</span>
                                    <button
                                        onClick={() => handleDeleteTrailer(trailer.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrailersVideos;