// src/components/layout.js
import React from 'react'
import { Link } from 'gatsby'
import '../styles/global.css'
import Lightbox from './Lightbox'

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Isle of Skye on 2 Wheels</h1>
        <p>A photographic journey through Scotland's most breathtaking landscapes</p>
      </header>
      <main>{children}</main>
      <footer>
        <p>
          © 2025 The Bikepack Blog | Photos by Our Team |{' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>{' '}
          |{' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        </p>
      </footer>
      <Lightbox />
    </div>
  )
}

export default Layout
