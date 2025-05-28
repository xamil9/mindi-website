import React, { useState } from 'react';
import jacob from '../assets/cast/jacob.jpg';
import emily from '../assets/cast/emily.jpg';
import eddie from '../assets/cast/eddie.jpg';
import jay from '../assets/cast/jay.jpg';
import rick from '../assets/cast/rick.jpg';

const CastGrid = () => {
  const cast = [
    { name: 'Jacob Fortune-Lloyd', role: 'Brian Epstein', image: jacob },
    { name: 'Emily Watson', role: 'Queenie Epstein', image: emily },
    { name: 'Eddie Marsan', role: 'Harry Epstein', image: eddie },
    { name: 'Jay Leno', role: 'Ed Sullivan', image: jay },
    { name: 'Jacob Fortune-Lloyd', role: 'Brian Epstein', image: rick }
  ];

  const [visibleIndex, setVisibleIndex] = useState(null);

  const handleToggle = (index) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  return (
    <section className="bg-white text-black dark:bg-black dark:text-white py-12 px-6 w-full overflow-hidden">
      <h3 className="text-xl font-semibold mb-6 text-center">Cast</h3>

      {/* Swipe indicator */}
      <div className="text-center mb-4 text-xs text-gray-500 dark:text-gray-400 sm:hidden">
        Swipe to view &rarr;
      </div>

      <div className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory">
        <div
          className="flex gap-4 justify-center min-w-fit px-2"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {cast.map((actor, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 snap-start flex flex-col items-center w-[50vw] sm:w-[28vw] md:w-[22vw] lg:w-[16vw]"
            >
              <div
                className="w-full aspect-square mb-4 bg-gray-700 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                />
                {/* Mobile overlay on tap */}
                {visibleIndex === index && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white sm:hidden">
                    <div className="text-base font-semibold">{actor.name}</div>
                    <div className="text-xs">{actor.role}</div>
                  </div>
                )}
              </div>

              {/* Always visible on sm+ */}
              <div className="text-center hidden sm:block">
                <div className="text-base font-semibold bg-white text-black dark:bg-black dark:text-white">
                  {actor.name}
                </div>
                <div className="text-xs text-black dark:text-gray-300">
                  {actor.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CastGrid;
