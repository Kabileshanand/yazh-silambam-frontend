import React from 'react';

const NetworkLoader = ({ label = 'Loading...' }) => {
  return (
    <div className="network-loader" role="status" aria-live="polite">
      <img src="/Buffering.png" alt="Loading" className="network-loader-image" />
      <p className="network-loader-text">{label}</p>
    </div>
  );
};

export default NetworkLoader;
