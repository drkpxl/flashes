// src/components/Lightbox.js
import React, { useState, useEffect } from 'react'

const Lightbox = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentImage, setCurrentImage] = useState({ src: '', alt: '', caption: '' });
  
  useEffect(() => {
    // Handle setup when component mounts
    const handlePhotoClick = (e) => {
      const item = e.currentTarget;
      const fullSrc = item.dataset.full;
      const alt = item.querySelector('img').alt;
      const caption = item.dataset.caption || alt;
      
      setCurrentImage({ src: fullSrc, alt, caption });
      setIsActive(true);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    };
    
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isActive) {
        closeLightbox();
      }
    };
    
    // Attach event listeners
    const photoItems = document.querySelectorAll('.photo-card, .full');
    photoItems.forEach(item => {
      item.addEventListener('click', handlePhotoClick);
    });
    
    document.addEventListener('keydown', handleEscKey);
    
    // Cleanup on unmount
    return () => {
      photoItems.forEach(item => {
        item.removeEventListener('click', handlePhotoClick);
      });
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isActive]); // Re-run effect if isActive changes
  
  const closeLightbox = () => {
    setIsActive(false);
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear image source after animation completes
    setTimeout(() => {
      if (!isActive) {
        setCurrentImage({ src: '', alt: '', caption: '' });
      }
    }, 300);
  };
  
  return (
    <div className={`lightbox ${isActive ? 'active' : ''}`} onClick={(e) => {
      if (e.target === e.currentTarget) closeLightbox();
    }}>
      <div className="lightbox-content">
        <button 
          className="lightbox-close" 
          aria-label="Close lightbox"
          onClick={(e) => {
            e.stopPropagation();
            closeLightbox();
          }}
        >
          ×
        </button>
        {currentImage.src && (
          <img src={currentImage.src} alt={currentImage.alt} />
        )}
        {currentImage.caption && (
          <p className="lightbox-caption">{currentImage.caption}</p>
        )}
      </div>
    </div>
  );
};

export default Lightbox;