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
  { id: 5, name: "To Do Lists", url: "/toDoLists" },
  { id: 6, name: "Shopping Lists", url: "/shoppingLists" },
  { id: 7, name: "Habits", url: "/habits" },
  { id: 8, name: "Chores", url: "/habits/cleaning" },
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

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

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
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-search-center">
            <input
              type="text"
              className="form-control"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsDropdownVisible(true)}
              onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
              aria-label="Search pages"
            />
            {searchQuery && isDropdownVisible && (
              <ul
                className="list-group position-absolute w-100 mt-1"
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

          {/* NAV LINKS & LOGIN/LOGOUT */}
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
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

            <li className="nav-item">
              {token ? (
                <button
                  onClick={attemptLogout}
                  className="btn btn-login-custom d-flex align-items-center"
                >
                  Log Out
                </button>
              ) : (
                <NavLink
                  to="/users/login"
                  className="btn btn-login-custom d-flex align-items-center"
                >
                  Log In
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
