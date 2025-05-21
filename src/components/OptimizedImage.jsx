// Create a new component: src/components/OptimizedImage.jsx
import React, { useState } from 'react';

export default function OptimizedImage({ src, alt, className, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-lg">
          <span className="text-gray-500">Image not found</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setError(true);
          setIsLoaded(true);
        }}
        {...props}
      />
    </div>
  );
}

// Then replace your img tags with:
<OptimizedImage
  src="/hero-image.jpg"
  alt="Media distribution platform"
  className="rounded-xl shadow-lg w-full"
/>