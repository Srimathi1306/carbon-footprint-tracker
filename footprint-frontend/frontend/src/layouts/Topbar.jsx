import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Topbar.css";
import NotificationBell from "../components/notification/NotificationBell";
import GoogleTranslate from "../components/translation/GoogleTranslate";
import LanguageSelector from "../components/translation/LanguageSelector";

function Topbar() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <GoogleTranslate />

      <header className="topbar">
        <div>
          <h2>Welcome, {user?.name || "User"} 👋</h2>
          <p>Track your carbon footprint and build a greener future.</p>
        </div>

        <div className="topbar-right">
          <LanguageSelector />

          <NotificationBell />

          <div
            className="profile-box"
            ref={menuRef}
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaUserCircle className="profile-icon" />

            <div>
              <h4>{user?.name}</h4>
              <span>{user?.role}</span>
            </div>

            {showMenu && (
              <div className="profile-dropdown">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowMenu(false);
                  }}
                >
                  My Profile
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Topbar;
