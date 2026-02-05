import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await AuthService.login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password.");
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "450px" }}>
      <div className="card auth-card p-4">
        <div className="card-body">
          <div className="auth-header mb-4">
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">Please enter your details to sign in.</p>
          </div>

          {error && <div className="alert alert-danger text-center p-2">{error}</div>}

          <form onSubmit={handleLogin}>
            {/* Username Input with Floating Label */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Username</label>
            </div>

            {/* Password Input with Floating Label */}
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button 
              className="btn btn-primary btn-custom w-100 mb-3" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <span><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/register" className="text-decoration-none fw-bold" style={{ color: "#667eea" }}>
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;