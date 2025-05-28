// src/components/FilmmakerDashboard/components/AnnotationsManager/Chapters.jsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical, Save } from 'lucide-react';
import { showNotification } from '../../utils/helpers';

const Chapters = () => {
    const [chapters, setChapters] = useState([
        { id: 1, title: 'Opening Scene', timestamp: 0, duration: 180 },
        { id: 2, title: 'Introduction', timestamp: 180, duration: 420 },
        { id: 3, title: 'Rising Action', timestamp: 600, duration: 900 }
    ]);
    const [editingChapter, setEditingChapter] = useState(null);

    const formatTimestamp = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAddChapter = () => {
        const newChapter = {
            id: chapters.length + 1,
            title: `Chapter ${chapters.length + 1}`,
            timestamp: chapters.length > 0 ? chapters[chapters.length - 1].timestamp + chapters[chapters.length - 1].duration : 0,
            duration: 300
        };
        setChapters([...chapters, newChapter]);
        setEditingChapter(newChapter.id);
    };

    const handleDeleteChapter = (chapterId) => {
        if (window.confirm('Are you sure you want to delete this chapter?')) {
            setChapters(chapters.filter(c => c.id !== chapterId));
            showNotification('Chapter deleted successfully', 'success');
        }
    };

    const handleSaveChapter = (chapterId, updates) => {
        setChapters(chapters.map(c =>
            c.id === chapterId ? { ...c, ...updates } : c
        ));
        setEditingChapter(null);
        showNotification('Chapter saved successfully', 'success');
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Film Chapters</h3>
                <button
                    onClick={handleAddChapter}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Add Chapter
                </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                    Chapters help viewers navigate your film and improve engagement by allowing them to jump to specific sections.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                        <div className="col-span-1"></div>
                        <div className="col-span-5">Chapter Title</div>
                        <div className="col-span-2">Start Time</div>
                        <div className="col-span-2">Duration</div>
                        <div className="col-span-2">Actions</div>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {chapters.map((chapter) => (
                        <div key={chapter.id} className="p-4 hover:bg-gray-50">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-1">
                                    <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                                </div>
                                <div className="col-span-5">
                                    {editingChapter === chapter.id ? (
                                        <input
                                            type="text"
                                            defaultValue={chapter.title}
                                            className="w-full px-3 py-1 border border-gray-300 rounded"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSaveChapter(chapter.id, { title: e.target.value });
                                                }
                                            }}
                                            autoFocus
                                        />
                                    ) : (
                                        <span className="font-medium">{chapter.title}</span>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <span className="text-sm text-gray-600">
                                        {formatTimestamp(chapter.timestamp)}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-sm text-gray-600">
                                        {formatTimestamp(chapter.duration)}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex items-center gap-2">
                                        {editingChapter === chapter.id ? (
                                            <button
                                                onClick={() => setEditingChapter(null)}
                                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                                            >
                                                <Save className="h-4 w-4" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setEditingChapter(chapter.id)}
                                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteChapter(chapter.id)}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chapters;