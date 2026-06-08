import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useAuth } from "../context/AuthContext";
import { api, authHeader } from "../services/api";
import { buildPostFormData, getPostDescription, getPostTitle } from "../services/postUtils";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [form, setForm] = useState({
    post_name: "",
    desc: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/posts/posts/${id}`, {
          headers: authHeader(token),
        });
        const payload = response.data?.payload;

        setForm({
          post_name: getPostTitle(payload),
          desc: getPostDescription(payload),
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.post_name.trim() || !form.desc.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    const confirmed = window.confirm("are you sure you want to update this post");

    if (!confirmed) {
      return;
    }

    try {
      setUpdating(true);
      await api.put(`/posts/posts/${id}`, buildPostFormData(form, selectedFile), {
        headers: {
          ...authHeader(token),
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post updated successfully.");
      navigate("/posts", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update the post.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="panel">Loading update form...</div>;
  }

  return (
    <section>
      <p className="muted">Edit your existing post</p>
      <h1 className="section-title">Update post</h1>
      <PostForm
        form={form}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        submitLabel={updating ? "Updating..." : "Update post"}
        showImageRequiredHint={false}
      />
    </section>
  );
}

export default EditPost;
