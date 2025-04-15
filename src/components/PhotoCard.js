// src/components/PhotoCard.js
import React from 'react'
const PhotoCard = ({ fullSrc, caption, src, alt }) => (
  <div className="photo-card" data-full={fullSrc} data-caption={caption}>
    <img src={src} alt={alt} loading="lazy" />
  </div>
)
export default PhotoCard
