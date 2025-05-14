import React from 'react';

const NotFound: React.FC = () => (
  <div className="text-center mt-5">
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <button
      className="btn btn-primary"
      onClick={() => (window.location.href = '/')}
    >
      Go Home
    </button>
  </div>
);

export default NotFound;
