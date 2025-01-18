import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useState } from "react";

const pages = [{ id: 1, name: "Home", url: "/HomePage" }];

function Navbar() {
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
    <nav>
      <div
        className="search-container"
        onMouseEnter={() => setIsDropdownVisible(true)}
        onMouseLeave={() => setIsDropdownVisible(false)}
      >
        <input
          type="text"
          placeholder="Search pages..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />

        {(isDropdownVisible || searchQuery) && (
          <ul className="dropdown-list">
            {filteredPages.map((page) => (
              <li
                key={page.id}
                onClick={() => handlePageSelection(page.url)}
                className="dropdown-item"
              >
                {page.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul className="nav-menu">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {token ? (
          <>
            <li>
              <a href="#" onClick={attemptLogout}>
                Log Out
              </a>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/users/login">Log In</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
