import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";

import { getNotifications } from "../../services/notificationService";

import NotificationDropdown from "./NotificationDropdown";

import "../../styles/Notification.css";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await getNotifications();

      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="notification-wrapper" ref={dropdownRef}>
      <button className="notification-btn" onClick={() => setOpen(!open)}>
        <FaBell />

        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={notifications}
          refresh={loadNotifications}
        />
      )}
    </div>
  );
}

export default NotificationBell;
