function About() {
  return (
    <div className="about-stack">
      <section className="about-hero">
        <div className="panel about-hero-main">
          <p className="muted">About PostSpace</p>
          <h1 className="section-title">A focused platform for publishing image-driven posts</h1>
          <p>
            PostSpace is designed for users who want a simple and organized way to share
            image posts online. It combines clean publishing, readable previews, and full
            post pages in one straightforward workflow.
          </p>
        </div>

        <div className="panel about-hero-side">
          <p className="muted">Core idea</p>
          <h3>Keep posting simple, visual, and easy to manage</h3>
          <p>
            The platform is built to help creators upload images quickly, give each post a
            useful description, and maintain content without unnecessary complexity.
          </p>
        </div>
      </section>

      <section className="grid-3">
        <article className="panel about-card">
          <p className="muted">Platform highlights</p>
          <h3>Structured image posts</h3>
          <p>Each post includes an image, a title, and a full description for better storytelling.</p>
        </article>

        <article className="panel about-card">
          <p className="muted">User flow</p>
          <h3>Simple account journey</h3>
          <p>Users can sign up, log in, start posting, and manage their existing content with ease.</p>
        </article>

        <article className="panel about-card">
          <p className="muted">Content control</p>
          <h3>Detail-first management</h3>
          <p>From the full post page, users can review complete content, update it, or delete it safely.</p>
        </article>
      </section>

      <section className="grid-2">
        <div className="panel about-callout">
          <p className="muted">What makes it useful</p>
          <h2 className="section-subtitle">Built for real projects, not just a demo screen</h2>
          <p>
            PostSpace can support portfolio showcases, project journals, event memories,
            creative galleries, announcements, and personal storytelling experiences.
          </p>
        </div>

        <div className="panel about-callout about-accent">
          <p className="muted">Experience</p>
          <h2 className="section-subtitle">Clear layout, simple actions, and focused reading</h2>
          <p>
            The platform is designed so both creators and visitors can move through the
            content naturally, from preview cards to full detail pages, without confusion.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
