import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ShoppingBag, Mail, Lock, LogIn, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError("");
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values,
        );

        console.log("Login success:", data);

        // save token
        localStorage.setItem("token", data.token);
        setToken(data.token);

        // go to home
        navigate("/");
      } catch (err) {
        console.error("Login error:", err);
        const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5 px-3">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden w-100" style={{ maxWidth: "480px" }}>
        
        {/* Top Accent Line */}
        <div className="bg-success" style={{ height: "6px" }}></div>
        
        <div className="card-body p-4 p-md-5">
          {/* Back to Home Link */}
          <Link to="/" className="text-decoration-none text-muted small d-inline-flex align-items-center gap-1 mb-4 hover-opacity">
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Logo & Header */}
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle p-3 mb-2 text-success">
              <ShoppingBag size={36} />
            </div>
            <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
            <p className="text-muted small">Sign in to continue to FreshCart</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 rounded-3 small mb-4 animate-fade-in" role="alert">
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit} noValidate>
            
            {/* Email Field */}
            <div className="mb-3 text-start">
              <label className="form-label text-secondary small fw-semibold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 py-2 px-3 text-muted">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className={`form-control border-start-0 py-2 px-3 ${
                    formik.touched.email && formik.errors.email ? "is-invalid" : ""
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback text-start">{formik.errors.email}</div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4 text-start">
              <label className="form-label text-secondary small fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0 py-2 px-3 text-muted">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className={`form-control border-start-0 border-end-0 py-2 px-3 ${
                    formik.touched.password && formik.errors.password ? "is-invalid" : ""
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary border-start-0 bg-white text-muted py-2 px-3 hover-bg-light"
                  style={{ borderColor: "#dee2e6" }}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback text-start">{formik.errors.password}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success w-100 py-2.5 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2 mb-4"
            >
              {loading ? (
                <>
                  <Loader2 className="spinner-border spinner-border-sm animate-spin border-0 me-1" style={{ width: "1.2rem", height: "1.2rem" }} />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>

            {/* Redirect Links */}
            <div className="text-center pt-2 border-top">
              <p className="text-muted small mb-0">
                Don't have an account?{" "}
                <Link to="/register" className="text-success fw-semibold text-decoration-none">
                  Register here
                </Link>
              </p>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
