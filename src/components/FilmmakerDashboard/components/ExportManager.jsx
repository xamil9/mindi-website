// src/components/FilmmakerDashboard/components/ExportManager.jsx
import React, { useState } from 'react';
import { Package, Download, FileText, Loader } from 'lucide-react';
import { showNotification, downloadFile } from '../utils/helpers';

const ExportManager = ({ exportQueue, setExportQueue, selectedFilm }) => {
  const [exportTab, setExportTab] = useState('festival');
  const [loading, setLoading] = useState(false);

  const handleExportPackage = async (packageType) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newExport = {
        id: exportQueue.length + 1,
        name: `${packageType} - ${new Date().toLocaleDateString()}`,
        createdAt: 'Just now',
        status: 'processing',
        downloadUrl: null,
        fileSize: '0 MB'
      };

      setExportQueue([newExport, ...exportQueue]);

      // Simulate processing completion
      setTimeout(() => {
        setExportQueue(prev => prev.map(exp =>
          exp.id === newExport.id
            ? { ...exp, status: 'completed', downloadUrl: '#download', fileSize: '2.4 GB' }
            : exp
        ));
      }, 5000);

      showNotification('Export started! You will be notified when it\'s ready.', 'info');
    } catch (error) {
      console.error('Error creating export:', error);
      showNotification('Failed to create export', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExport = (exportItem) => {
    const content = `Export Package: ${exportItem.name}\nCreated: ${exportItem.createdAt}\nFile Size: ${exportItem.fileSize}\n\nThis is a simulated export file.`;
    downloadFile(content, `${exportItem.name.replace(/\s+/g, '_')}.txt`);
    showNotification(`Downloading ${exportItem.name}...`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setExportTab('festival')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            exportTab === 'festival'
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Festival Packages
        </button>
        <button
          onClick={() => setExportTab('technical')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            exportTab === 'technical'
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Technical Exports
        </button>
        <button
          onClick={() => setExportTab('marketing')}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            exportTab === 'marketing'
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Marketing Materials
        </button>
      </div>

      {/* Festival Packages */}
      {exportTab === 'festival' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-start gap-4">
              <Package className="h-8 w-8 text-purple-600 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">Festival Submission Package</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Generate a complete package with all materials required for film festival submissions
                </p>

                <div className="space-y-3">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Select Festival Type</span>
                    <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Cannes Film Festival</option>
                      <option>Sundance Film Festival</option>
                      <option>Toronto International Film Festival</option>
                      <option>Berlin International Film Festival</option>
                      <option>Custom Requirements</option>
                    </select>
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">DCP Export</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Press Kit</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Stills (High-res)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Technical Specs</span>
                    </label>
                  </div>

                  <button
                    onClick={() => handleExportPackage('Festival Submission Package')}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Generate Festival Package
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Export History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold">Recent Exports</h4>
            </div>
            <div className="divide-y divide-gray-200">
              {exportQueue.map((exportItem) => (
                <div key={exportItem.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{exportItem.name}</p>
                      <p className="text-sm text-gray-500">{exportItem.createdAt} • {exportItem.fileSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {exportItem.status === 'completed' ? (
                      <button
                        onClick={() => handleDownloadExport(exportItem)}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Loader className="h-4 w-4 animate-spin" />
                        Processing...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Technical Exports */}
      {exportTab === 'technical' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold mb-3">Cinema Package (DCP)</h4>
              <p className="text-sm text-gray-600 mb-4">
                Digital Cinema Package for theatrical projection
              </p>
              <div className="space-y-2 mb-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="dcp" defaultChecked />
                  <span className="text-sm">2K Resolution</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="dcp" />
                  <span className="text-sm">4K Resolution</span>
                </label>
              </div>
              <button
                onClick={() => handleExportPackage('DCP Package')}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create DCP
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold mb-3">Broadcast Master</h4>
              <p className="text-sm text-gray-600 mb-4">
                Broadcast-ready file with proper specifications
              </p>
              <div className="space-y-2 mb-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">ProRes 422 HQ</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Include subtitles</span>
                </label>
              </div>
              <button
                onClick={() => handleExportPackage('Broadcast Master')}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Export Master
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Marketing Materials */}
      {exportTab === 'marketing' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h4 className="font-semibold mb-4">Marketing Package</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleExportPackage('Poster Package')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <h5 className="font-medium">Posters</h5>
                <p className="text-sm text-gray-500 mt-1">All sizes</p>
              </button>
              <button
                onClick={() => handleExportPackage('Social Media Kit')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <h5 className="font-medium">Social Media</h5>
                <p className="text-sm text-gray-500 mt-1">Optimized images</p>
              </button>
              <button
                onClick={() => handleExportPackage('Trailer Package')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <h5 className="font-medium">Trailers</h5>
                <p className="text-sm text-gray-500 mt-1">Multiple formats</p>
              </button>
              <button
                onClick={() => handleExportPackage('Press Photos')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <h5 className="font-medium">Press Photos</h5>
                <p className="text-sm text-gray-500 mt-1">High resolution</p>
              </button>
              <button
                onClick={() => handleExportPackage('EPK Materials')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <h5 className="font-medium">EPK</h5>
                <p className="text-sm text-gray-500 mt-1">Electronic Press Kit</p>
              </button>
              <button
                onClick={() => handleExportPackage('Screening Materials')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <h5 className="font-medium">Screening</h5>
                <p className="text-sm text-gray-500 mt-1">Q&A materials</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportManager;