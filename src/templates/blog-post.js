// src/templates/blog-post.js
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import '../styles/blog.css'
import '../styles/global.css'

// This template works with gatsby-plugin-mdx v5+ which uses MDX v2
export default function BlogPost({ data, children }) {
  const post = data.mdx
  return (
    <Layout>
      <article>
        <header className="post-header">
          <h1>{post.frontmatter.title}</h1>
          <p className="post-meta">{post.frontmatter.date}</p>
        </header>
        <section className="post-content">
          {/* The MDX content is now passed as children */}
          {children}
        </section>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`