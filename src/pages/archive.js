// src/pages/archive.js
import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'

const ArchivePage = ({ data }) => {
  const posts = data.allMdx.nodes;
  
  return (
    <Layout 
      pageTitle="Blog Archive"
      headerText="All stories from my cycling adventures"
    >
      <div className="container">
        <section className="archive-section">
          <h2>All Blog Posts</h2>
          
          <div className="archive-list">
            {posts.map(post => {
              const featuredImage = post.frontmatter.featuredImage 
                ? getImage(post.frontmatter.featuredImage) 
                : null;
              
              return (
                <article key={post.id} className="archive-item">
                  {featuredImage && (
                    <div className="archive-image">
                      <GatsbyImage
                        image={featuredImage}
                        alt={post.frontmatter.title}
                      />
                    </div>
                  )}
                  <div className="archive-content">
                    <h3>
                      <Link to={post.fields.slug}>
                        {post.frontmatter.title}
                      </Link>
                    </h3>
                    <p className="archive-date">{post.frontmatter.date}</p>
                    <p className="archive-excerpt">
                      {post.frontmatter.description || post.excerpt}
                    </p>
                    <Link to={post.fields.slug} className="read-more">
                      Read full article →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          
          <div className="archive-footer">
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 160)
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
                width: 300
                height: 200
                placeholder: BLURRED
                transformOptions: { cropFocus: CENTER }
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;

export default ArchivePage;