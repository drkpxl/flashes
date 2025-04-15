// src/templates/blog-list.js
import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'

const BlogList = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <Layout 
      pageTitle="Blog"
      headerText="Stories from our cycling adventures"
    >
      <section>
        <h2>Latest Articles</h2>
        <div className="blog-list">
          {posts.map(post => {
            const featuredImage = post.frontmatter.featuredImage 
              ? getImage(post.frontmatter.featuredImage) 
              : null
            
            return (
              <article key={post.id} className="blog-card">
                {featuredImage && (
                  <div className="blog-card-image">
                    <GatsbyImage
                      image={featuredImage}
                      alt={post.frontmatter.title}
                    />
                  </div>
                )}
                <div className="blog-card-content">
                  <h3>
                    <Link to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                  </h3>
                  <p className="blog-card-date">{post.frontmatter.date}</p>
                  {post.frontmatter.description && (
                    <p className="blog-card-excerpt">
                      {post.frontmatter.description}
                    </p>
                  )}
                  <Link to={post.fields.slug} className="read-more">
                    Read more
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 600
                height: 300
                placeholder: BLURRED
                transformOptions: {cropFocus: CENTER}
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        excerpt(pruneLength: 120)
      }
    }
  }
`

export default BlogList