// src/components/FilmmakerDashboard/components/common/Loader.jsx
import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

const Loader = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-7xl h-[90vh] flex items-center justify-center">
          <LoaderIcon className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    </>
  );
};

export default Loader;