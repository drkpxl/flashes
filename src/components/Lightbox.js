// src/components/Lightbox.js
import React, { useEffect } from 'react'
import '../styles/global.css'

const Lightbox = () => {
  useEffect(() => {
    const lightbox = document.getElementById('lightbox')
    if (!lightbox) return

    const lightboxImg = lightbox.querySelector('img')
    const lightboxCaption = lightbox.querySelector('.lightbox-caption')
    const lightboxClose = lightbox.querySelector('.lightbox-close')
    const photoItems = document.querySelectorAll('.photo-card, .full')

    const openLightbox = (e) => {
      const item = e.currentTarget
      const fullSrc = item.dataset.full
      const alt = item.querySelector('img').alt
      const caption = item.dataset.caption || alt

      lightboxImg.src = fullSrc
      lightboxImg.alt = alt
      lightboxCaption.textContent = caption
      lightbox.classList.add('active')
      document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
      lightbox.classList.remove('active')
      document.body.style.overflow = ''
      setTimeout(() => {
        if (!lightbox.classList.contains('active')) {
          lightboxImg.src = ''
        }
      }, 300)
    }

    photoItems.forEach(item => {
      item.addEventListener('click', openLightbox)
    })

    lightboxClose.addEventListener('click', (e) => {
      e.stopPropagation()
      closeLightbox()
    })

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })

    const escListener = (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox()
      }
    }
    document.addEventListener('keydown', escListener)

    // Cleanup on unmount
    return () => {
      photoItems.forEach(item => {
        item.removeEventListener('click', openLightbox)
      })
      lightboxClose.removeEventListener('click', closeLightbox)
      lightbox.removeEventListener('click', closeLightbox)
      document.removeEventListener('keydown', escListener)
    }
  }, [])

  return (
    <div className="lightbox" id="lightbox">
      <div className="lightbox-content">
        <button className="lightbox-close" aria-label="Close lightbox">×</button>
        <img src="" alt="Expanded image" />
        <p className="lightbox-caption"></p>
      </div>
    </div>
  )
}

export default Lightbox
