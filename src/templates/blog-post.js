// src/templates/blog-post.js
import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../components/layout'
import PhotoCard from '../components/PhotoCard'
import PhotoGrid from '../components/PhotoGrid'
import '../styles/blog.css'
import '../styles/global.css'

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
          {/* This is where the MDX content will be rendered */}
          <MDXProvider
            components={{
              PhotoCard,
              PhotoGrid
            }}
          >
            {children}
          </MDXProvider>
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