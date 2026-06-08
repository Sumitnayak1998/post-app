import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="nav-bar">
          <NavLink to="/" className="brand">
            PostSpace
          </NavLink>

          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/posts" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
              Posts
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
              Contact
            </NavLink>
          </div>

          <div className="nav-actions">
            {isAuthenticated ? (
              <button type="button" className="button-ghost" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/signup" className="nav-button">
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="page-wrap">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <h3>PostSpace</h3>
            <p className="footer-copy">
              Publish image posts, write full stories, and manage your content with a
              cleaner workflow.
            </p>
          </div>

          <div className="footer-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <div>
            <p className="footer-heading">Built for creators</p>
            <p className="footer-copy">
              From first upload to final update, keep every post organized in one place.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
