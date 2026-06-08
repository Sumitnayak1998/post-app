import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useAuth } from "../context/AuthContext";
import { api, authHeader } from "../services/api";
import { buildPostFormData } from "../services/postUtils";

const initialForm = {
  post_name: "",
  desc: "",
};

function Posts() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [apiNotice, setApiNotice] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/posts/posts", {
        headers: authHeader(token),
      });

      const payload = response.data?.payload;
      setPosts(Array.isArray(payload) ? payload : []);
      setApiNotice("");
    } catch (error) {
      setPosts([]);
      const message = error.response?.data?.message || "Unable to load posts.";
      setApiNotice(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();

    if (!form.post_name.trim() || !form.desc.trim() || !selectedFile) {
      toast.error("Title, description, and image are required.");
      return;
    }

    try {
      setCreating(true);
      await api.post("/posts/posts", buildPostFormData(form, selectedFile), {
        headers: {
          ...authHeader(token),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post created successfully.");
      setForm(initialForm);
      setSelectedFile(null);
      fetchPosts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create post.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="posts-page">
      <section className="posts-top-banner panel">
        <div>
          <p className="muted">Your publishing workspace</p>
          <h1 className="section-title">Create, organize, and review your visual posts</h1>
          <p className="posts-intro">
            Use this space to publish image-based content, keep your feed updated, and
            open each post in full detail whenever you want to edit or manage it.
          </p>
        </div>

        <div className="posts-banner-stats">
          <div className="posts-banner-card">
            <strong>{posts.length}</strong>
            <span>Posts in your feed</span>
          </div>
          <div className="posts-banner-card">
            <strong>1 place</strong>
            <span>Create and manage everything from here</span>
          </div>
        </div>
      </section>

      {apiNotice ? <div className="status-banner">Backend response: {apiNotice}</div> : null}

      <div className="posts-layout">
        <div className="panel posts-form-shell">
          <div className="posts-section-head">
            <p className="muted">New post</p>
            <h2 className="section-subtitle">Publish a fresh image post</h2>
            <p className="posts-supporting-text">
              Add a title, write a strong description, upload your image, and share it to
              your posts feed.
            </p>
          </div>

          <PostForm
            form={form}
            onChange={handleChange}
            onFileChange={handleFileChange}
            onSubmit={handleCreatePost}
            submitLabel={creating ? "Creating..." : "Create post"}
          />
        </div>

        <div className="panel posts-panel">
          <div className="posts-section-head">
            <p className="muted">Posts gallery</p>
            <h2 className="section-subtitle">Browse everything you have published</h2>
            <p className="posts-supporting-text">
              Each card shows a quick preview while the full post page gives you the
              complete content and management actions.
            </p>
          </div>

          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <div className="empty-state posts-empty">
              <h3>No posts yet</h3>
              <p>Create your first image post to start building your feed.</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
