// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: `Flashes`,
    description: `Journey's around the world`,
    author: `@drkpxl`,
    siteUrl: `https://yourusername.github.io/your-repo-name`, // Update this for proper SEO
  },
  plugins: [
    `gatsby-plugin-react-helmet`, // For better SEO handling
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
              withAvif: true,
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-copy-linked-files', // Adds support for linked files
        ],
      }
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
          quality: 80,
          breakpoints: [576, 768, 992, 1200, 1600],
          backgroundColor: 'transparent',
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links', // Intercepts local links for gatsby routing
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `Flashes`,
        short_name: `Skye Biking`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#2a6496`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // Replace with your site icon
      },
    },
    'gatsby-plugin-offline', // For PWA capabilities
  ],
}