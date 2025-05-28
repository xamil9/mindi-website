// src/components/FilmmakerDashboard/components/MarketingHub.jsx
import React, { useState } from 'react';
import { 
  Twitter, Facebook, Instagram, Youtube, Calendar, Info,
  Copy, Search, Target, ExternalLink, Download
} from 'lucide-react';
import { handleCopyToClipboard, handleSocialShare, downloadFile } from '../utils/helpers';

const MarketingHub = ({ selectedFilm, filmId, modals }) => {
  const [marketingTab, setMarketingTab] = useState('seo');
  const [seoData, setSeoData] = useState({
    title: selectedFilm?.title || 'Award Winning Film',
    metaDescription: 'Experience the emotional journey of...',
    keywords: ['short film', 'drama', 'award winning', 'indie'],
    slug: 'award-winning-film'
  });
  const [embedCode, setEmbedCode] = useState(`<iframe src="https://yourplatform.com/embed/${filmId}" width="640" height="360"></iframe>`);

  const seoScore = 87; // Calculate based on various factors

  const handleDownloadPressKit = (section) => {
    const content = `${section} Press Kit\n\nFilm: ${selectedFilm?.title}\nGenre: ${selectedFilm?.genre}\nDuration: ${selectedFilm?.duration} minutes\nYear: ${selectedFilm?.year}\n\n${
      section === 'Complete Press Kit' 
        ? 'This package contains all press materials including high-resolution stills, press releases, director\'s statements, and technical specifications.' 
        : `This document contains the ${section} for the film.`
    }`;

    downloadFile(content, `${selectedFilm?.title}_${section.replace(/\s+/g, '_')}.txt`);
    modals.setShowPressKitModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setMarketingTab('seo')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            marketingTab === 'seo'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          SEO Optimization
        </button>
        <button
          onClick={() => setMarketingTab('social')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            marketingTab === 'social'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Social Media
        </button>
        <button
          onClick={() => setMarketingTab('promo')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            marketingTab === 'promo'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Promotional Tools
        </button>
      </div>

      {/* SEO Optimization */}
      {marketingTab === 'seo' && (
        <div className="space-y-6">
          {/* SEO Score */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">SEO Score</h3>
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle cx="40" cy="40" r="36" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                  <circle
                    cx="40" cy="40" r="36"
                    stroke="#10B981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - seoScore / 100)}`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{seoScore}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm">Title length is optimal (50-60 characters)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="text-sm">Add more keywords to description</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm">URL slug is SEO-friendly</span>
              </div>
            </div>
          </div>

          {/* SEO Fields */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
              <input
                type="text"
                value={seoData.title}
                onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={60}
              />
              <p className="text-xs text-gray-500 mt-1">{seoData.title.length}/60 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea
                value={seoData.metaDescription}
                onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">{seoData.metaDescription.length}/160 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Focus Keywords</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {seoData.keywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {keyword}
                    <button
                      onClick={() => {
                        setSeoData({
                          ...seoData,
                          keywords: seoData.keywords.filter((_, i) => i !== index)
                        });
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add keyword..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    setSeoData({ ...seoData, keywords: [...seoData.keywords, e.target.value] });
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>

          {/* Search Preview */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h4 className="text-sm font-semibold mb-3">Google Search Preview</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-blue-600 text-lg mb-1 hover:underline cursor-pointer">
                {seoData.title}
              </h3>
              <p className="text-green-700 text-sm mb-1">
                yourplatform.com/watch/{seoData.slug}
              </p>
              <p className="text-gray-600 text-sm">
                {seoData.metaDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Campaigns */}
      {marketingTab === 'social' && (
        <div className="space-y-6">
          {/* Quick Share */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Quick Share</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => handleSocialShare('twitter', filmId, selectedFilm?.title)}
                className="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Twitter className="h-5 w-5" />
                Twitter
              </button>
              <button
                onClick={() => handleSocialShare('facebook', filmId, selectedFilm?.title)}
                className="flex items-center justify-center gap-2 p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
              >
                <Facebook className="h-5 w-5" />
                Facebook
              </button>
              <button
                onClick={() => handleSocialShare('instagram', filmId, selectedFilm?.title)}
                className="flex items-center justify-center gap-2 p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              >
                <Instagram className="h-5 w-5" />
                Instagram
              </button>
              <button
                onClick={() => handleSocialShare('youtube', filmId, selectedFilm?.title)}
                className="flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Youtube className="h-5 w-5" />
                YouTube
              </button>
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Active Campaigns</h3>
              <button
                onClick={() => modals.setShowCampaignCreatorModal(true)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                + New Campaign
              </button>
            </div>

            <div className="space-y-3">
              {[
                { platform: 'twitter', name: 'Launch Tweet Thread', status: 'active', engagement: '2.3K' },
                { platform: 'instagram', name: 'Behind the Scenes', status: 'scheduled', engagement: '-' },
                { platform: 'youtube', name: 'Trailer Campaign', status: 'completed', engagement: '15K' }
              ].map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {campaign.platform === 'twitter' && <Twitter className="h-5 w-5 text-blue-400" />}
                    {campaign.platform === 'instagram' && <Instagram className="h-5 w-5 text-pink-400" />}
                    {campaign.platform === 'youtube' && <Youtube className="h-5 w-5 text-red-500" />}
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-gray-500">
                        {campaign.status === 'active' && 'Running now'}
                        {campaign.status === 'scheduled' && 'Starts tomorrow'}
                        {campaign.status === 'completed' && 'Ended'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{campaign.engagement}</p>
                    <p className="text-sm text-gray-500">engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-Generated Content */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">AI-Generated Social Content</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Twitter Thread (5 tweets)</p>
                <p className="mb-3">🎬 Just released: "{selectedFilm?.title}" - a journey through human resilience...</p>
                <button
                  onClick={() => modals.setShowThreadViewModal(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  View Full Thread →
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Instagram Caption</p>
                <p className="mb-3">Behind every frame lies a story untold. Today, we share...</p>
                <button
                  onClick={() => handleCopyToClipboard('Behind every frame lies a story untold. Today, we share...')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Copy Caption →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promotional Tools */}
      {marketingTab === 'promo' && (
        <div className="space-y-6">
          {/* Embed Widget */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Embed Widget</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Embed Size</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>640x360 (16:9)</option>
                  <option>854x480 (16:9)</option>
                  <option>1280x720 (16:9)</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Embed Code</label>
                <div className="relative">
                  <textarea
                    value={embedCode}
                    readOnly
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
                    rows={3}
                  />
                  <button
                    onClick={() => handleCopyToClipboard(embedCode)}
                    className="absolute top-2 right-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Shareable Links */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Smart Links</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Main Share Link</p>
                  <p className="text-sm text-gray-500">platform.com/w/{filmId}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyToClipboard(`https://platform.com/w/${filmId}`)}
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => window.open(`https://platform.com/w/${filmId}`, '_blank')}
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Press Kit */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Digital Press Kit</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  modals.setPressKitSection('High-Res Stills');
                  modals.setShowPressKitModal(true);
                }}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-left"
              >
                <h4 className="font-medium mb-1">High-Res Stills</h4>
                <p className="text-sm text-gray-500">12 production photos</p>
              </button>
              <button
                onClick={() => {
                  modals.setPressKitSection('Press Release');
                  modals.setShowPressKitModal(true);
                }}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-left"
              >
                <h4 className="font-medium mb-1">Press Release</h4>
                <p className="text-sm text-gray-500">PDF & Word formats</p>
              </button>
              <button
                onClick={() => handleDownloadPressKit("Director's Statement")}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-left"
              >
                <h4 className="font-medium mb-1">Director's Statement</h4>
                <p className="text-sm text-gray-500">500 words</p>
              </button>
              <button
                onClick={() => handleDownloadPressKit('Technical Specs')}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 text-left"
              >
                <h4 className="font-medium mb-1">Technical Specs</h4>
                <p className="text-sm text-gray-500">Format, runtime, etc.</p>
              </button>
            </div>
            <button
              onClick={() => handleDownloadPressKit('Complete Press Kit')}
              className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download Complete Press Kit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingHub;