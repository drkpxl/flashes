# Isle of Skye on 2 Wheels - Site Redesign

This document provides step-by-step instructions for implementing the site redesign for your photography blog.

## Overview of Changes

1. **New Modern Homepage** - A full-featured homepage that showcases your photography, about section, and latest blog posts
2. **Improved Navigation** - Fixed navigation bar with links to all sections
3. **Enhanced Blog System** - Blog posts displayed on the homepage and a dedicated archive page
4. **Optimized Components** - Improved PhotoCard, PhotoGrid, and Lightbox components
5. **Streamlined CSS** - Better organized CSS with responsive design

## Implementation Steps

### 1. Directory Structure

Create the necessary directory structure for CSS files:

```bash
mkdir -p src/styles/components
```

### 2. Replace Component Files

Replace or create the following component files:

- `src/components/Layout.js` - Replace with consolidated layout component
- `src/components/PhotoCard.js` - Replace with optimized version
- `src/components/PhotoGrid.js` - Replace with optimized version
- `src/components/Lightbox.js` - Replace with optimized version

### 3. CSS Files

Add the following CSS files:

- `src/styles/global.css` - Replace with updated global CSS
- `src/styles/components/grid.css` - Create new file for grid components
- `src/styles/components/lightbox.css` - Create new file for lightbox component
- `src/styles/components/blog.css` - Create new file for blog styling
- `src/styles/home.css` - Create new file for homepage styling

### 4. Page Files

Replace or create the following page files:

- `src/pages/index.js` - Replace with new homepage
- `src/pages/archive.js` - Create new archive page

### 5. Template Files

Replace or create the following template files:

- `src/templates/blog-post.js` - Replace with improved blog post template
- `src/templates/blog-list.js` - Create if not present (used for pagination)

### 6. Configuration Files

Replace or update these configuration files:

- `gatsby-config.js` - Replace with optimized version
- `gatsby-node.js` - Replace with improved version
- `package.json` - Update dependencies

### 7. Install New Dependencies

Run the following command to install new dependencies:

```bash
npm install gatsby-plugin-catch-links gatsby-plugin-manifest gatsby-plugin-offline gatsby-plugin-react-helmet gatsby-remark-copy-linked-files react-helmet
```

### 8. Update MDX Files (optional)

If you want to add featured images to your blog posts, update your MDX files to include:

```mdx
---
title: "Your Post Title"
date: "2025-04-15"
description: "Brief description of your post"
featuredImage: "../../src/images/your-image.jpg"
imageCaption: "Optional caption for your featured image"
---

Your post content here...
```

### 9. Test Locally

Run the following commands to test your changes locally:

```bash
gatsby clean
gatsby develop
```

Visit http://localhost:8000 to see your changes.

### 10. Deploy to GitHub Pages

Once you're happy with the changes, deploy to GitHub Pages:

```bash
gatsby build
gatsby deploy
```

## Customization Tips

### Replacing Images

- Replace the placeholder images in the homepage with your own photos
- Update the hero image by changing the URL in `home.css` (look for `.hero` background)
- Add your own profile photo by replacing the StaticImage in the About section

### Updating Content

- Update the about text with your own bio
- Update social media links with your own profiles
- Update contact information with your own details

### Color Scheme

The color scheme can be easily changed by updating the CSS variables in `global.css`:

```css
:root {
  --primary-color: #2a6496; /* Change this for main color */
  --accent-color: #e63946;  /* Change this for accent color */
  /* Other variables... */
}
```

## Need Help?

If you encounter any issues during implementation, feel free to reach out for assistance!