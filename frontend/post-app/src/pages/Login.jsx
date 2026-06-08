import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
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

    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users/login", {
        email: form.email.trim(),
        password: form.password,
      });

      const meResponse = await api.get("/users/me");
      login("", meResponse.data?.data || null);
      toast.success("Login successful.");
      navigate(location.state?.from || "/posts", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <p className="muted">Login to continue</p>
        <h1 className="section-title">Welcome back</h1>

        <form className="form-grid" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
            />
          </label>

          <div className="form-actions">
            <button className="button-primary" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="helper-text">
          Don&apos;t have an account? <Link to="/signup">Create one here</Link>.
        </p>
      </div>
    </section>
  );
}

export default Login;
