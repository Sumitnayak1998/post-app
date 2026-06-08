import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-stack">
      <section className="hero">
        <div className="hero-card">
          <p className="muted">Create, manage, and present image posts beautifully</p>
          <h1>Give every image a story, and every story a clean place to live.</h1>
          <p>
            PostSpace is built for simple publishing. Upload images, write meaningful
            descriptions, and manage your posts through a clean interface that feels like
            a real content platform.
          </p>

          <div className="form-actions">
            <Link to="/signup" className="button-primary">
              Start sharing
            </Link>
            <Link to="/posts" className="button-ghost">
              View all posts
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <strong>Fast publishing</strong>
              Upload an image, add a title, and publish in moments
            </div>
            <div className="stat-box">
              <strong>Readable previews</strong>
              Keep your post list clean with short descriptions on each card
            </div>
            <div className="stat-box">
              <strong>Full control</strong>
              Open details, update content, or remove posts anytime
            </div>
          </div>
        </div>

        <aside className="hero-card hero-panel">
          <p className="hero-panel-tag">Platform highlights</p>
          <h2>Made for simple, image-first publishing</h2>

          <div className="hero-feature-list">
            <div className="hero-feature-item">
              <strong>Smart post flow</strong>
              <span>Create a post, preview it in the feed, and open the full story on a dedicated page.</span>
            </div>
            <div className="hero-feature-item">
              <strong>Creator control</strong>
              <span>Update titles, change descriptions, replace visuals, or delete posts whenever needed.</span>
            </div>
            <div className="hero-feature-item">
              <strong>Clean browsing</strong>
              <span>Visitors see compact cards first, then dive into full details without clutter.</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid-3">
        <article className="panel feature-card">
          <p className="muted">For publishing</p>
          <h3>Turn uploads into meaningful posts</h3>
          <p>
            Every post combines a visual, a heading, and a full description so visitors
            can quickly understand the content and open the full story when needed.
          </p>
        </article>

        <article className="panel feature-card">
          <p className="muted">For management</p>
          <h3>Keep your content easy to maintain</h3>
          <p>
            Edit titles, replace images, improve descriptions, or delete older posts
            without dealing with a complicated admin flow.
          </p>
        </article>

        <article className="panel feature-card">
          <p className="muted">For reading</p>
          <h3>Make browsing feel clean and focused</h3>
          <p>
            Visitors first see a compact card layout, then move to a dedicated detail page
            for the complete post experience.
          </p>
        </article>
      </section>

      <section className="grid-2">
        <div className="panel">
          <p className="muted">Where it fits</p>
          <h2 className="section-subtitle">Useful for portfolios, updates, events, and galleries</h2>
          <p>
            This project works well for sharing project snapshots, event highlights,
            design showcases, student updates, announcements, and simple visual blogs.
          </p>
        </div>

        <div className="panel">
          <p className="muted">User journey</p>
          <h2 className="section-subtitle">A simple flow from signup to post management</h2>
          <p>
            Users can register, log in, publish a post, open a full detail page, and then
            return later to update or delete the same content whenever they need.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
