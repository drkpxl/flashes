// src/templates/blog-post.js
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import '../styles/blog.css'
import '../styles/global.css'

// This version works with gatsby-plugin-mdx v4+ which uses MDX v2
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
          {/* In newer versions of gatsby-plugin-mdx, the rendered content is passed as children */}
          {children}
        </section>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`