// src/components/Layout.js
import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Lightbox from './Lightbox'
import { Helmet } from 'react-helmet'

// Note: capitalized filename to follow React component naming conventions

const Layout = ({ children, pageTitle, headerImage, headerText, customHeader = false }) => {
  // Get site metadata
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title;
  const siteDescription = data.site.siteMetadata.description;
  
  // Use passed page title or default to site title
  const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={siteDescription} />
        <html lang="en" />
        {/* Add additional meta tags as needed */}
      </Helmet>

      {/* Navigation */}
      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            {siteTitle}
          </Link>
          
          <ul className="nav-links">
            <li><a href="/#about">About</a></li>
            <li><a href="/#gallery">Gallery</a></li>
            <li><a href="/#blog">Blog</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Render standard header unless customHeader is true */}
      {!customHeader && (
        <header className="page-header" style={{ 
          background: headerImage 
            ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${headerImage}') center/cover no-repeat`
            : `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://picsum.photos/id/1018/1600/900') center/cover no-repeat`
        }}>
          <div className="header-content">
            <h1>{pageTitle || siteTitle}</h1>
            {headerText && <p>{headerText}</p>}
          </div>
        </header>
      )}

      <main>{children}</main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">{siteTitle}</Link>
            <p>A photographic journey through Scotland's most breathtaking landscapes</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-nav">
              <h3>Navigation</h3>
              <ul>
                <li><a href="/#about">About</a></li>
                <li><a href="/#gallery">Gallery</a></li>
                <li><a href="/#blog">Blog</a></li>
                <li><a href="/#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-social">
              <h3>Connect</h3>
              <ul>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteTitle} | Photos by Your Name | All Rights Reserved</p>
        </div>
      </footer>

      {/* Lightbox component for image viewing */}
      <Lightbox />
    </>
  )
}

export default Layout