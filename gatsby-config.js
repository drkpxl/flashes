const path = require('path')

module.exports = {
  siteMetadata: {
    title: `My Gatsby Blog`,
    description: `A blog powered by Gatsby and Markdown.`,
    author: `@yourhandle`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-images',
          'gatsby-remark-responsive-iframe',
        ],
       
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}