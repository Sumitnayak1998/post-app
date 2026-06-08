import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api, authHeader } from "../services/api";
import { getImageUrl, getPostDescription, getPostTitle } from "../services/postUtils";

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/posts/posts/${id}`, {
          headers: authHeader(token),
        });
        setPost(response.data?.payload || null);
        setShowFullDescription(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, token]);

  const handleDelete = async () => {
    const confirmed = window.confirm("are you sure you want to delete this post");

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      await api.delete(`/posts/posts/${id}`, {
        headers: authHeader(token),
      });
      toast.success("Post deleted successfully.");
      navigate("/posts", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete the post.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="panel">Loading post details...</div>;
  }

  if (!post) {
    return <div className="panel">Post not found.</div>;
  }

  const description = getPostDescription(post) || "No description available.";
  const isLongDescription = description.length > 180;
  const visibleDescription =
    showFullDescription || !isLongDescription
      ? description
      : `${description.slice(0, 180).trim()}...`;

  return (
    <section className="detail-wrap">
      <div className="detail-card detail-card-compact">
        <img className="detail-image" src={getImageUrl(post)} alt={getPostTitle(post)} />

        <div className="detail-body">
          <p className="muted">Full post details</p>
          <h1>{getPostTitle(post)}</h1>
          <div className="detail-description-box">
            <p className="detail-description">
              {visibleDescription}
              {isLongDescription ? (
                <button
                  type="button"
                  className="description-toggle"
                  onClick={() => setShowFullDescription((current) => !current)}
                >
                  {showFullDescription ? "See less" : "See more"}
                </button>
              ) : null}
            </p>
          </div>

          <div className="detail-actions">
            <Link className="detail-action detail-action-primary" to={`/posts/${id}/edit`}>
              Update post
            </Link>
            <button
              className="detail-action detail-action-danger"
              type="button"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete post"}
            </button>
            <Link className="detail-action detail-action-neutral" to="/posts">
              Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostDetails;
