/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it

// gatsby-browser.js
import React from 'react'
import './src/styles/global.css'
import PhotoCard from './src/components/PhotoCard'
import PhotoGrid from './src/components/PhotoGrid'

// Make components available to MDX files
export const wrapRootElement = ({ element }) => {
  return element
}