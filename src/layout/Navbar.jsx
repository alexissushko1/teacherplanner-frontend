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
    setIsDropdownVisible(e.target.value.length > 0);
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search pages..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />

        {isDropdownVisible && (
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
      <menu>
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
      </menu>
    </nav>
  );
}

export default Navbar;
