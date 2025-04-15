// gatsby-node.js
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `content/blog` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  
  // Query for MDX nodes to use in creating pages
  const result = await graphql(`
    {
      allMdx(
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMdx.nodes

  // Create pages for each MDX file
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
      
      const { slug } = post.fields
      const { contentFilePath } = post.internal
      
      createPage({
        path: slug,
        // The component template and contentFilePath are linked using the `?__contentFilePath` syntax
        component: `${blogPostTemplate}?__contentFilePath=${contentFilePath}`,
        context: {
          id: post.id,
          slug: slug,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
  
  // Create a blog index page at /blog
  createPage({
    path: '/blog',
    component: path.resolve('./src/templates/blog-list.js'),
    context: {},
  })
}

// Add schema customization to ensure fields exist
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Define the schema for frontmatter fields to prevent errors when fields are missing
  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String!
      date: Date @dateformat
      description: String
      featuredImage: File @fileByRelativePath
      imageCaption: String
    }
    type Fields {
      slug: String
    }
  `)
}