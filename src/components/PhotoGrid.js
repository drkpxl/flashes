// src/components/PhotoGrid.js
import React from 'react'

const PhotoGrid = ({ children, columns = "auto-fill", minWidth = "180px" }) => {
  // Allow customization of grid properties
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`,
    gap: '1.5rem',
    margin: '2rem 0'
  };
  
  return (
    <div className="grid" style={gridStyle}>
      {children}
    </div>
  );
};

export default PhotoGrid;