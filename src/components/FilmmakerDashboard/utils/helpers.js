// src/components/FilmmakerDashboard/utils/helpers.js

export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    const colorMap = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };

    notification.className = `fixed top-4 right-4 ${colorMap[type]} text-white px-4 py-2 rounded-lg shadow-lg z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
};

export const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'info');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy to clipboard', 'error');
    });
};

export const handleSocialShare = (platform, filmId, filmTitle) => {
    const shareUrl = `https://platform.com/films/${filmId}`;
    const shareText = `Check out "${filmTitle}" - An amazing film!`;

    const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        instagram: `https://www.instagram.com/`,
        youtube: `https://www.youtube.com/`
    };

    if (platform === 'instagram' || platform === 'youtube') {
        handleCopyToClipboard(shareUrl);
        showNotification(`Link copied! Share it on ${platform}`, 'info');
    } else {
        window.open(urls[platform], '_blank', 'width=600,height=400');
    }
};

export const validateURL = (url) => {
    if (!url) return true; // Empty URL is valid
    return /^https?:\/\/.+/.test(url);
};

export const downloadFile = (content, filename, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };