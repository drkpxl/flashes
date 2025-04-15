// gatsby-config.js
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
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-responsive-iframe',
        ],
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}