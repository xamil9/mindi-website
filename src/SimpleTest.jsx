# Create a super simple test component
cat > ./src/SimpleTest.jsx << 'EOF'
import React from 'react';

function SimpleTest() {
  const hostname = window.location.hostname;
  
  if (hostname === 'dashboard.mindi.tv') {
    return (
      <div>
        <h1>Dashboard Works!</h1>
        <p>Hostname: {hostname}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Main Site</h1>
      <p>Hostname: {hostname}</p>
    </div>
  );
}

export default SimpleTest;
EOF