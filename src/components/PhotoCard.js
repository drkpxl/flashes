import React from 'react'
const PhotoCard = ({ fullSrc, caption, src, alt }) => {
  console.log('PhotoCard rendering with:', { fullSrc, caption, src, alt });
  return (
    <div className="photo-card" data-full={fullSrc} data-caption={caption}>
      <img src={src} alt={alt || caption} loading="lazy" />
    </div>
  )
}
export default PhotoCard