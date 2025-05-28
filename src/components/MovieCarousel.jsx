import React from 'react';

const movies = [
  {
    title: 'The Butterfly Effect',
    image: 'https://m.media-amazon.com/images/I/71uAI28kJuL._AC_SY679_.jpg'
  },
  {
    title: 'Night Drive',
    image: 'https://m.media-amazon.com/images/I/81l2Pa9N0JL._AC_SY679_.jpg'
  },
  {
    title: 'Ghost Line',
    image: 'https://m.media-amazon.com/images/I/71nNjWxAcUL._AC_SY679_.jpg'
  },
  {
    title: 'Desert Escape',
    image: 'https://m.media-amazon.com/images/I/81bL9UNH0lL._AC_SY679_.jpg'
  },
  {
    title: 'Echoes',
    image: 'https://m.media-amazon.com/images/I/81VStYnDGrL._AC_SY679_.jpg'
  },
  {
    title: 'No Way Back',
    image: 'https://m.media-amazon.com/images/I/81dQwQlmAXL._AC_SY679_.jpg'
  }
];

const MovieCarousel = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Featured Films</h2>
      <div style={{
        display: 'flex',
        gap: '1rem',
        overflowX: 'auto',
        paddingBottom: '1rem'
      }}>
        {movies.map((movie, index) => (
          <div
            key={index}
            style={{
              minWidth: '200px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#181A1F',
              color: '#fff',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 15px #FF6C00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img
              src={movie.image}
              alt={movie.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.5rem', textAlign: 'center' }}>{movie.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
