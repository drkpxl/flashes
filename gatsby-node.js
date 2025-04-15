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
      allMdx {
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

  // Create pages for each MDX file
  result.data.allMdx.nodes.forEach(node => {
    const { slug } = node.fields
    const { contentFilePath } = node.internal
    
    createPage({
      path: slug,
      // The component template and contentFilePath are linked using the `?__contentFilePath` syntax
      component: `${blogPostTemplate}?__contentFilePath=${contentFilePath}`,
      context: {
        id: node.id,
        slug: slug,
      },
    })
  })
}