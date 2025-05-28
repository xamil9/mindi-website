// src/components/FilmmakerDashboard/components/SettingsPanel.jsx
import React from 'react';
import { showNotification } from '../utils/helpers';

const SettingsPanel = ({ filmSettings, setFilmSettings }) => {
  const handleSaveSettings = () => {
    showNotification('Settings saved successfully!', 'success');
  };

  return (
    <div className="min-h-full">
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Film Settings</h3>

          <div className="space-y-6">
            {/* Visibility Settings */}
            <div>
              <h4 className="font-medium mb-3">Visibility</h4>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium">Public</p>
                    <p className="text-sm text-gray-500">Anyone can find and watch your film</p>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={filmSettings.visibility === 'public'}
                    onChange={(e) => setFilmSettings({ ...filmSettings, visibility: e.target.value })}
                    className="text-blue-600"
                  />
                </label>
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium">Unlisted</p>
                    <p className="text-sm text-gray-500">Only people with the link can watch</p>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    value="unlisted"
                    checked={filmSettings.visibility === 'unlisted'}
                    onChange={(e) => setFilmSettings({ ...filmSettings, visibility: e.target.value })}
                    className="text-blue-600"
                  />
                </label>
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <p className="font-medium">Private</p>
                    <p className="text-sm text-gray-500">Only you can watch</p>
                  </div>
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={filmSettings.visibility === 'private'}
                    onChange={(e) => setFilmSettings({ ...filmSettings, visibility: e.target.value })}
                    className="text-blue-600"
                  />
                </label>
              </div>
            </div>

            {/* Interaction Settings */}
            <div>
              <h4 className="font-medium mb-3">Viewer Interactions</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Comments</p>
                    <p className="text-sm text-gray-500">Let viewers leave comments on your film</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={filmSettings.comments}
                      onChange={(e) => setFilmSettings({ ...filmSettings, comments: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Downloads</p>
                    <p className="text-sm text-gray-500">Let viewers download the film</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={filmSettings.downloads}
                      onChange={(e) => setFilmSettings({ ...filmSettings, downloads: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Embedding</p>
                    <p className="text-sm text-gray-500">Let others embed your film on their sites</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={filmSettings.embedAllowed}
                      onChange={(e) => setFilmSettings({ ...filmSettings, embedAllowed: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </label>
              </div>
            </div>

            {/* Age Restriction */}
            <div>
              <h4 className="font-medium mb-3">Age Restriction</h4>
              <select
                value={filmSettings.ageRestriction}
                onChange={(e) => setFilmSettings({ ...filmSettings, ageRestriction: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="none">No age restriction</option>
                <option value="13+">13+ (Teen)</option>
                <option value="16+">16+ (Mature)</option>
                <option value="18+">18+ (Adult)</option>
              </select>
            </div>

            {/* Content Warnings */}
            <div>
              <h4 className="font-medium mb-3">Content Warnings</h4>
              <div className="space-y-2">
                {['Violence', 'Language', 'Sexual Content', 'Drug Use', 'Flashing Lights'].map((warning) => (
                  <label key={warning} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={filmSettings.contentWarnings.includes(warning)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilmSettings({
                            ...filmSettings,
                            contentWarnings: [...filmSettings.contentWarnings, warning]
                          });
                        } else {
                          setFilmSettings({
                            ...filmSettings,
                            contentWarnings: filmSettings.contentWarnings.filter(w => w !== warning)
                          });
                        }
                      }}
                    />
                    <span className="text-sm">{warning}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSaveSettings}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;