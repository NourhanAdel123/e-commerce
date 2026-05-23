import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ShoppingBag, Menu, X, LogOut, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "active fw-semibold text-success"
      : "text-secondary";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm py-3 sticky-top">
      <div className="container">
        {/* Brand Logo */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold text-success fs-3 m-0"
          to="/"
        >
          <ShoppingBag size={28} className="text-success" />
          <span style={{ letterSpacing: "-0.5px" }}>FreshCart</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 p-2 shadow-none"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <X size={24} className="text-dark" />
          ) : (
            <Menu size={24} className="text-dark" />
          )}
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show pt-3 pt-lg-0" : ""}`}
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-2">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${isActive("/")}`}
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${isActive("/products")}`}
                to="/products"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${isActive("/categories")}`}
                to="/categories"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
            </li>
            {token && (
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 ${isActive("/checkout")}`}
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                >
                  Checkout
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 ms-lg-auto pt-3 pt-lg-0 border-top border-lg-0 mt-3 mt-lg-0">
            {token ? (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="btn btn-outline-danger px-4 rounded-pill d-flex align-items-center justify-content-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-success px-4 rounded-pill d-flex align-items-center justify-content-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-success text-white px-4 rounded-pill d-flex align-items-center justify-content-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus size={16} />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
