// gatsby-ssr.js
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import './src/styles/global.css'
import PhotoCard from './src/components/PhotoCard'
import PhotoGrid from './src/components/PhotoGrid'

// Make components available to MDX files - mirror of gatsby-browser.js
export const wrapRootElement = ({ element }) => {
  return React.createElement(
    MDXProvider,
    {
      components: {
        PhotoCard,
        PhotoGrid
      }
    },
    element
  )
}

// Keep your existing onRenderBody export
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="google-fonts"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="google-fonts-2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />,
    <link
      key="google-fonts-css"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500..700;1,500..700&display=swap"
      rel="stylesheet"
    />,
  ]);
};