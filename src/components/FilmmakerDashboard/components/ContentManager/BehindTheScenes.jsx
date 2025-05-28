// src/components/FilmmakerDashboard/components/ContentManager/BehindTheScenes.jsx
import React, { useState } from 'react';
import { Camera, Upload, Image, Plus, X, Loader } from 'lucide-react';
import { showNotification } from '../../utils/helpers';

const BehindTheScenes = ({ btsPictures, setBtsPictures }) => {
    const [uploadingPhotos, setUploadingPhotos] = useState(false);

    const handlePhotoUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setUploadingPhotos(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newPhotos = files.map((file, index) => ({
                id: btsPictures.length + index + 1,
                url: URL.createObjectURL(file),
                name: file.name
            }));

            setBtsPictures([...btsPictures, ...newPhotos]);
            showNotification(`${files.length} photos uploaded successfully!`, 'success');
        } catch (error) {
            console.error('Error uploading photos:', error);
            showNotification('Failed to upload photos', 'error');
        } finally {
            setUploadingPhotos(false);
        }
    };

    const handleDeletePhoto = (photoIndex) => {
        const newPhotos = btsPictures.filter((_, index) => index !== photoIndex);
        setBtsPictures(newPhotos);
        showNotification('Photo deleted successfully', 'success');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Behind the Scenes</h3>
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                    <Camera className="h-4 w-4" />
                    Upload Photos
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        disabled={uploadingPhotos}
                    />
                </label>
            </div>

            {/* BTS Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold mb-4">Production Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shooting Locations
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., Los Angeles, New York"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Production Duration
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., 45 days"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Camera Equipment
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., ARRI Alexa Mini"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Special Effects
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., Practical effects, CGI"
                        />
                    </div>
                </div>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold mb-4">Photo Gallery</h4>

                {uploadingPhotos && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Loader className="h-4 w-4 animate-spin text-blue-600" />
                            <span className="text-sm">Uploading photos...</span>
                        </div>
                    </div>
                )}

                {btsPictures.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">
                            Drop photos here or click to upload
                        </p>
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                            <Upload className="h-4 w-4" />
                            Choose Files
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                disabled={uploadingPhotos}
                            />
                        </label>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {btsPictures.map((pic, i) => (
                            <div key={i} className="relative group">
                                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Camera className="h-8 w-8 text-gray-400" />
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeletePhoto(i)}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                        <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                            <div className="text-center">
                                <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                <span className="text-sm text-gray-600">Add More</span>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                disabled={uploadingPhotos}
                            />
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BehindTheScenes;