import { MDXProvider } from '@mdx-js/react'

import React from 'react'
import './src/styles/global.css'
import PhotoCard from './src/components/PhotoCard'
import PhotoGrid from './src/components/PhotoGrid'

// Make components available to MDX files
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