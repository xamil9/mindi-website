// ShareModal.js
import React from 'react';

const ShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-center mb-4 text-gray-900">
          Share Downers
        </h2>
        <p className="text-sm text-gray-700 mb-4 text-center">
          If you share this content before completing your purchase, you won’t be eligible to earn any money from others sharing or purchasing the film through your referral link.
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            readOnly
            value="https://yourdomain.com/referral-link"
            className="flex-1 border border-gray-300 p-2 rounded text-sm"
          />
          <button className="px-3 py-2 bg-gray-200 text-sm rounded font-medium hover:bg-gray-300">
            Copy link
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Facebook</button>
          <button className="bg-[#0077B5] text-white px-4 py-2 rounded-md text-sm">LinkedIn</button>
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm">X (Twitter)</button>
          <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-md text-sm">
            <span className="font-medium">G</span>mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
