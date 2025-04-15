// src/components/PhotoCard.js
import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const PhotoCard = ({ fullSrc, caption, src, alt, gatsbyImageData }) => {
  // Support for both standard image paths and gatsby-image-plugin
  const image = gatsbyImageData ? getImage(gatsbyImageData) : null;
  
  return (
    <div className="photo-card" data-full={fullSrc} data-caption={caption}>
      {image ? (
        <GatsbyImage image={image} alt={alt || caption} />
      ) : (
        <img src={src} alt={alt || caption} loading="lazy" />
      )}
    </div>
  )
}

export default PhotoCard