import { useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl, getPostDescription, getPostId, getPostTitle } from "../services/postUtils";

function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false);
  const description = getPostDescription(post);
  const isLongDescription = description.length > 90;
  const excerpt =
    expanded || !isLongDescription
      ? description
      : `${description.slice(0, 90).trim()}...`;

  return (
    <article className="post-card post-card-compact">
      <img className="post-cover" src={getImageUrl(post)} alt={getPostTitle(post)} />

      <div className="post-body">
        <div className="post-meta">Published post</div>
        <h3>{getPostTitle(post)}</h3>
        <div className="post-excerpt-box">
          <p className="post-excerpt">
            {excerpt || "No description provided yet."}
            {isLongDescription ? (
              <button
                type="button"
                className="card-description-toggle"
                onClick={() => setExpanded((current) => !current)}
              >
                {expanded ? "See less" : "See more"}
              </button>
            ) : null}
          </p>
        </div>
        <div className="card-actions">
          <Link className="button-secondary" to={`/posts/${getPostId(post)}`}>
            Open details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
