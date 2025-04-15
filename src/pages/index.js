// src/pages/index.js
import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import '../styles/home.css'

// Import components
import Layout from '../components/Layout'
import PhotoGrid from '../components/PhotoGrid'

const HomePage = ({ data }) => {
  const posts = data.allMdx.nodes;
  
  return (
    <Layout 
      pageTitle="Home"
      // No header text needed as we'll customize the header in this component
      customHeader={true}
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Isle of Skye on 2 Wheels</h1>
          <p className="tagline">Capturing Scotland's breathtaking landscapes through the lens of a cyclist</p>
          <div className="hero-cta">
            <a href="#gallery" className="btn btn-primary">View Gallery</a>
            <a href="#about" className="btn btn-secondary">About Me</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-image">
            <StaticImage
              src="../images/example.png"
              alt="Photographer on a bike"
              placeholder="blurred"
              layout="constrained"
              width={400}
              height={500}
              className="profile-image"
            />
          </div>
          <div className="about-content">
            <h2>About Me</h2>
            <p>
              Hello! I'm a photographer and cycling enthusiast with a passion for capturing the raw beauty of Scotland's landscapes. 
              My journey began five years ago when I first visited the Isle of Skye with nothing but my camera and bicycle.
            </p>
            <p>
              What started as a personal adventure has evolved into a mission to document the incredible 
              terrain, weather, and light that make Scotland's landscapes so unique and mesmerizing.
            </p>
            <p>
              Through my lens, I hope to inspire others to explore these magnificent places and develop 
              a deeper appreciation for our natural world.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section id="gallery" className="gallery-section">
        <h2>Featured Photography</h2>
        <p className="section-intro">
          A selection of my favorite shots from recent cycling expeditions across the Isle of Skye.
        </p>
        
        <PhotoGrid columns="auto-fill" minWidth="280px">
          {/* Replace these with your actual images */}
          <div className="photo-card" data-full="https://picsum.photos/id/10/1200/1200" data-caption="Misty mountain pass near Quiraing">
            <img src="https://picsum.photos/id/10/400/400" alt="Misty mountain pass" loading="lazy" />
          </div>
          <div className="photo-card" data-full="https://picsum.photos/id/11/1200/1200" data-caption="Dawn at the Old Man of Storr">
            <img src="https://picsum.photos/id/11/400/400" alt="Dawn at Storr" loading="lazy" />
          </div>
          <div className="photo-card" data-full="https://picsum.photos/id/12/1200/1200" data-caption="Coastal road to Neist Point">
            <img src="https://picsum.photos/id/12/400/400" alt="Coastal road" loading="lazy" />
          </div>
          <div className="photo-card" data-full="https://picsum.photos/id/13/1200/1200" data-caption="Fairy Pools under dramatic skies">
            <img src="https://picsum.photos/id/13/400/400" alt="Fairy Pools" loading="lazy" />
          </div>
          <div className="photo-card" data-full="https://picsum.photos/id/14/1200/1200" data-caption="Evening light at Elgol Beach">
            <img src="https://picsum.photos/id/14/400/400" alt="Elgol Beach" loading="lazy" />
          </div>
          <div className="photo-card" data-full="https://picsum.photos/id/15/1200/1200" data-caption="Mountain biking trail through Glen Sligachan">
            <img src="https://picsum.photos/id/15/400/400" alt="Mountain biking trail" loading="lazy" />
          </div>
        </PhotoGrid>
        
        <div className="gallery-cta">
          <a href="#" className="btn btn-primary">View Full Gallery</a>
        </div>
      </section>

      {/* Latest Adventures (Blog) */}
      <section id="blog" className="blog-section">
        <h2>Latest Adventures</h2>
        <p className="section-intro">
          Stories, tips, and experiences from my cycling photography expeditions.
        </p>
        
        <div className="blog-grid">
          {posts.map(post => {
            const featuredImage = post.frontmatter.featuredImage 
              ? getImage(post.frontmatter.featuredImage) 
              : null;
            
            return (
              <article key={post.id} className="blog-card">
                <Link to={post.fields.slug} className="blog-link">
                  {featuredImage ? (
                    <div className="blog-image">
                      <GatsbyImage
                        image={featuredImage}
                        alt={post.frontmatter.title}
                      />
                    </div>
                  ) : (
                    <div className="blog-image blog-image-placeholder">
                      <div className="placeholder-text">Read Story</div>
                    </div>
                  )}
                  <div className="blog-content">
                    <h3>{post.frontmatter.title}</h3>
                    <p className="blog-date">{post.frontmatter.date}</p>
                    <p className="blog-excerpt">
                      {post.frontmatter.description || post.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        
        {posts.length > 3 && (
          <div className="blog-cta">
            <Link to="/archive" className="btn btn-secondary">View All Posts</Link>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Get In Touch</h2>
        <p className="section-intro">
          Interested in prints, collaborations, or just want to say hello? Drop me a message!
        </p>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>hello@isleofskye2wheels.com</p>
            </div>
            <div className="contact-item">
              <h3>Social</h3>
              <div className="social-links">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              </div>
            </div>
            <div className="contact-item">
              <h3>Newsletter</h3>
              <p>Subscribe to receive updates on new adventures and photography.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      nodes {
        id
        excerpt(pruneLength: 120)
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
                height: 400
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

export default HomePage;