// src/components/FilmmakerDashboard/components/AnnotationsManager/TimelineAnnotations.jsx
import React from 'react';
import { MessageSquare, Users, TrendingUp, Plus, Heart, Search } from 'lucide-react';
import StatCard from '../common/StatCard';
import { showNotification } from '../../utils/helpers';

const TimelineAnnotations = ({ annotations, setAnnotations, modals }) => {
    const handleDeleteAnnotation = (annotationId) => {
        if (window.confirm('Are you sure you want to delete this annotation?')) {
            setAnnotations(annotations.filter(a => a.id !== annotationId));
            showNotification('Annotation deleted successfully', 'success');
        }
    };

    const handleLikeAnnotation = (annotationId) => {
        const updatedAnnotations = annotations.map(a => {
            if (a.id === annotationId) {
                return { ...a, likes: a.likes + 1 };
            }
            return a;
        });
        setAnnotations(updatedAnnotations);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Timeline Annotations</h3>
                <button
                    onClick={() => modals.setShowAnnotationModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Add Annotation
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    icon={MessageSquare}
                    label="Total Annotations"
                    value={annotations.length}
                    color="blue"
                />
                <StatCard
                    icon={Users}
                    label="Unique Contributors"
                    value={new Set(annotations.map(a => a.userId)).size}
                    color="green"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Engagement Rate"
                    value="82%"
                    change={5.2}
                    color="purple"
                />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search annotations..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {annotations.slice(0, 5).map((annotation) => (
                        <div key={annotation.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-medium">{annotation.User?.name}</span>
                                        <span className="text-xs text-gray-500">
                                            at {Math.floor(annotation.timestamp / 60)}:{(annotation.timestamp % 60).toString().padStart(2, '0')}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${annotation.type === 'director' ? 'bg-purple-100 text-purple-700' :
                                                annotation.type === 'technical' ? 'bg-green-100 text-green-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {annotation.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{annotation.content}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <button
                                            onClick={() => handleLikeAnnotation(annotation.id)}
                                            className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                                        >
                                            <Heart className="h-3 w-3" />
                                            {annotation.likes}
                                        </button>
                                        <button
                                            onClick={() => {
                                                modals.setSelectedAnnotation(annotation);
                                                modals.setShowReplyModal(true);
                                            }}
                                            className="text-xs text-gray-500 hover:text-blue-600"
                                        >
                                            Reply
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAnnotation(annotation.id)}
                                            className="text-xs text-gray-500 hover:text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    {annotation.replies && annotation.replies.length > 0 && (
                                        <div className="mt-3 ml-4 space-y-2">
                                            {annotation.replies.map((reply) => (
                                                <div key={reply.id} className="p-2 bg-gray-50 rounded text-sm">
                                                    <p className="font-medium text-xs">{reply.user}</p>
                                                    <p className="text-gray-700">{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimelineAnnotations;