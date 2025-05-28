// src/components/FilmmakerDashboard/components/ContentManager/DirectorNotes.jsx
import React, { useState } from 'react';
import { Save, Loader } from 'lucide-react';
import { showNotification } from '../../utils/helpers';

const DirectorNotes = ({ directorNotes, setDirectorNotes }) => {
    const [loading, setLoading] = useState(false);
    const [localNotes, setLocalNotes] = useState(directorNotes);
    const [themes, setThemes] = useState('');
    const [influences, setInfluences] = useState('');
    const [specialThanks, setSpecialThanks] = useState('');

    const handleSaveDirectorNotes = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setDirectorNotes(localNotes);
            showNotification('Director notes saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving director notes:', error);
            showNotification('Failed to save director notes', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = () => {
        showNotification('Preview mode: Your director notes would be displayed as they will appear to viewers.', 'info');
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Director's Notes</h3>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Director's Vision
                    </label>
                    <textarea
                        value={localNotes}
                        onChange={(e) => setLocalNotes(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={8}
                        placeholder="Share your vision, inspiration, and the journey of making this film..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Key Themes
                        </label>
                        <input
                            type="text"
                            value={themes}
                            onChange={(e) => setThemes(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., Resilience, Human Connection"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Influences
                        </label>
                        <input
                            type="text"
                            value={influences}
                            onChange={(e) => setInfluences(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., Film noir, French New Wave"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Thanks
                    </label>
                    <textarea
                        value={specialThanks}
                        onChange={(e) => setSpecialThanks(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        rows={3}
                        placeholder="Acknowledge those who made this film possible..."
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={handlePreview}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Preview
                    </button>
                    <button
                        onClick={handleSaveDirectorNotes}
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Save Notes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DirectorNotes;