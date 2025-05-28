import React, { useRef, useEffect } from 'react';

const StillsGallery = () => {
  const scrollRef = useRef(null);

  const stills = [
    '/stills/still1.jpg',
    '/stills/still2.jpg',
    '/stills/still3.jpg',
    '/stills/still4.jpg',
    '/stills/still5.jpg',
    '/stills/still6.jpg',
    '/stills/still7.jpg',
    '/stills/still8.jpg',
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }
      }, 5000);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('mouseenter', stopAutoScroll);
      scrollContainer.addEventListener('mouseleave', startAutoScroll);
      startAutoScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', stopAutoScroll);
        scrollContainer.removeEventListener('mouseleave', startAutoScroll);
      }
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <section className="bg-white text-black dark:bg-black dark:text-white py-12 px-6 max-w-6xl mx-auto">
      <h3 className="text-3xl font-semibold text-center mb-8">Behind the Scenes</h3>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {stills.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[600px] h-[350px] snap-start"
          >
            <img
              src={src}
              alt={`Still ${i + 1}`}
              className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.error(`Failed to load image: ${src}`);
                e.target.src = 'https://via.placeholder.com/600x350?text=Image+Not+Found';
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          height: 6px;
          background-color: transparent;
        }
        .dark .scrollbar-hide::-webkit-scrollbar {
          background-color: #000;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb {
          background-color: #444;
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
};

export default StillsGallery;
