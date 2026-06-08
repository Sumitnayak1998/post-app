import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("All signup fields are required.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users/register", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      toast.success("Signup successful. Please login now.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <p className="muted">Create your account</p>
        <h1 className="section-title">Signup</h1>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field-label">
            Username
            <input
              className="input"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
          </label>

          <label className="field-label">
            Email
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </label>

          <label className="field-label">
            Password
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
          </label>

          <div className="form-actions">
            <button className="button-primary" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Signup"}
            </button>
          </div>
        </form>

        <p className="helper-text">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </section>
  );
}

export default Register;
