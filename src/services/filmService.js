// src/services/filmService.js

// Base API configuration
const API_BASE_URL = 'http://localhost:3001/api';

class FilmService {
  // Fetch complete film data
  async getFilmData(filmId) {
    try {
      const response = await fetch(`${API_BASE_URL}/films/${filmId}`);
      if (!response.ok) throw new Error('Film not found');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching film data:', error);
      throw error;
    }
  }

  // Fetch film analytics (for filmmakers)
  async getFilmAnalytics(filmId, userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/films/${filmId}/analytics`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'User-Id': userId
        }
      });
      
      if (!response.ok) throw new Error('Analytics not available');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }
  }

  // Fetch reviews
  async getReviews(filmId, page = 1, limit = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/films/${filmId}/reviews?page=${page}&limit=${limit}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch reviews');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return { reviews: [], total: 0 };
    }
  }

  // Fetch comments
  async getComments(filmId, page = 1, limit = 20) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/films/${filmId}/comments?page=${page}&limit=${limit}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch comments');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return { comments: [], total: 0 };
    }
  }

  // Post a new comment
  async postComment(filmId, userId, comment) {
    try {
      const response = await fetch(`${API_BASE_URL}/films/${filmId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          userId,
          text: comment,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) throw new Error('Failed to post comment');
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  }

  // Like/unlike a film
  async toggleLike(filmId, userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/films/${filmId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ userId })
      });
      
      if (!response.ok) throw new Error('Failed to toggle like');
      
      const data = await response.json();
      return data; // { liked: boolean, likesCount: number }
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }

  // Get user's purchase status for a film
  async getUserPurchaseStatus(filmId, userId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/${userId}/purchases/${filmId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          return { hasPurchased: false, tier: null };
        }
        throw new Error('Failed to fetch purchase status');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching purchase status:', error);
      return { hasPurchased: false, tier: null };
    }
  }

  // Increment view count
  async incrementViewCount(filmId) {
    try {
      await fetch(`${API_BASE_URL}/films/${filmId}/view`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }

  // Share tracking
  async trackShare(filmId) {
    try {
      await fetch(`${API_BASE_URL}/films/${filmId}/share`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error tracking share:', error);
    }
  }
}

export default new FilmService();