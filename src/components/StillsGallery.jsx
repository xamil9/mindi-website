import React, { useRef, useState, useEffect, useCallback } from 'react';

const StillsGallery = () => {
  const scrollRef = useRef(null);
  const modalRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  const stills = [
    '/stills/still1.jpg',
    '/stills/still2.jpg',
    '/stills/still3.jpg',
    '/stills/still4.jpg',
  ];

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1 < stills.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : stills.length - 1));
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    },
    [selectedIndex, stills.length]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedIndex, handleKeyDown]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setSelectedIndex((prev) => (prev + 1 < stills.length ? prev + 1 : 0));
      } else {
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : stills.length - 1));
      }
    }

    setTouchStartX(null);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setSelectedIndex(null);
    }
  };

  return (
    <section className="bg-black text-white py-12 px-0 relative w-full overflow-hidden">
      <h3 className="text-2xl font-semibold text-center mb-8">Stills</h3>

      <div className="relative">
        <div className="flex justify-center">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {stills.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-80 h-48 cursor-pointer"
                onClick={() => setSelectedIndex(i)}
              >
                <img
                  src={src}
                  alt={`Still ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300?text=Still+${i + 1}`;
                  }}
                />
              </div>
            ))}
            <div className="flex-shrink-0 w-6" />
          </div>
        </div>

        {/* Right-aligned scroll buttons (hidden on mobile) */}
        <div className="hidden sm:flex justify-end gap-3 px-6 mt-4">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Scroll Left"
          >
            ◀
          </button>
          <button
            onClick={scrollRight}
            className="w-10 h-10 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Scroll Right"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Lightbox modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300"
          onClick={handleClickOutside}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div ref={modalRef} className="text-center relative">
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-400 z-50"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={stills[selectedIndex]}
              alt={`Still ${selectedIndex + 1}`}
              className="max-w-6xl max-h-[90vh] object-contain rounded shadow-lg mb-4 transition-transform duration-300"
            />
            <div className="text-sm text-gray-400">
              Image {selectedIndex + 1} of {stills.length}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default StillsGallery;
