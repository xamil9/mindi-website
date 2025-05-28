import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#10141F',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '1px solid #222'
    }}>
      <div style={{ color: '#FF6C00', fontSize: '1.5rem', fontWeight: 'bold' }}>TubiLite</div>
      <div>
        <a href="/login" style={{ color: '#fff', marginRight: '1rem' }}>Login</a>
        <a href="/register" style={{ color: '#fff' }}>Register</a>
      </div>
    </nav>
  );
};

export default Navbar;
