// src/templates/blog-post.js
import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import { Helmet } from 'react-helmet'

export default function BlogPost({ data, children }) {
  const post = data.mdx;
  const featuredImage = post.frontmatter.featuredImage 
    ? getImage(post.frontmatter.featuredImage) 
    : null;
  
  return (
    <Layout 
      pageTitle={post.frontmatter.title}
      headerImage={featuredImage ? featuredImage.images.fallback.src : null}
    >
      <article>
        <header className="post-header">
          <h1>{post.frontmatter.title}</h1>
          <p className="post-meta">{post.frontmatter.date}</p>
        </header>
        
        {/* If there's a featured image, display it prominently */}
        {featuredImage && (
          <div className="featured-image">
            <GatsbyImage 
              image={featuredImage} 
              alt={post.frontmatter.title} 
            />
            {post.frontmatter.imageCaption && (
              <p className="image-caption">{post.frontmatter.imageCaption}</p>
            )}
          </div>
        )}
        
        <section className="post-content">
          {/* The MDX content is passed as children */}
          {children}
        </section>
        
        {/* Post navigation - previous and next posts */}
        {(data.previous || data.next) && (
          <nav className="post-navigation">
            <h2>More Articles</h2>
            <div className="post-nav-links">
              {data.previous && (
                <Link to={data.previous.fields.slug} className="prev-post">
                  ← {data.previous.frontmatter.title}
                </Link>
              )}
              
              {data.next && (
                <Link to={data.next.fields.slug} className="next-post">
                  {data.next.frontmatter.title} →
                </Link>
              )}
            </div>
          </nav>
        )}
      </article>
    </Layout>
  );
}

export const query = graphql`
  query($id: String!, $previousPostId: String, $nextPostId: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        imageCaption
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`