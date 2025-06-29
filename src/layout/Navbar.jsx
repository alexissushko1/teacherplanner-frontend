import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useState } from "react";

import "../css/NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const pages = [
  { id: 2, name: "Calendar", url: "/events" },
  { id: 3, name: "Personal Passwords", url: "/personalPasswords" },
  { id: 4, name: "School Passwords", url: "/schoolpasswords" },
];

function AppNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageSelection = (url) => {
    navigate(url);
    setSearchQuery("");
    setIsDropdownVisible(false);
  };

  const attemptLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Teacher Planner
        </a>
        <button
          className="navbar-toggler mb-3"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasLightNavbar"
          aria-controls="offcanvasLightNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-end bg-light"
          tabIndex="-1"
          id="offcanvasLightNavbar"
          aria-labelledby="offcanvasLightNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasLightNavbarLabel">
              Navigation
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            {/* Search input */}
            <div className="mb-3 position-relative">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={() =>
                  setTimeout(() => setIsDropdownVisible(false), 200)
                }
                aria-label="Search pages"
              />
              {searchQuery && isDropdownVisible && (
                <ul
                  className="list-group mt-2 position-absolute w-100"
                  style={{ zIndex: 1050 }}
                >
                  {filteredPages.length ? (
                    filteredPages.map((page) => (
                      <li
                        key={page.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => handlePageSelection(page.url)}
                        style={{ cursor: "pointer" }}
                      >
                        {page.name}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item disabled">No results</li>
                  )}
                </ul>
              )}
            </div>

            {/* Navigation Links */}
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={() => setSearchQuery("")}
                >
                  Home
                </NavLink>
              </li>

              {pages.map((page) => (
                <li className="nav-item" key={page.id}>
                  <NavLink className="nav-link" to={page.url}>
                    {page.name}
                  </NavLink>
                </li>
              ))}

              {/* Auth buttons */}
              <li className="nav-item mt-3">
                {token ? (
                  <button
                    onClick={attemptLogout}
                    className="btn btn-danger w-100"
                  >
                    Log Out
                  </button>
                ) : (
                  <NavLink to="/users/login" className="btn btn-success w-100">
                    Log In
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
