import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";

import { getOrganizationNotifications } from "../../services/organizationService";

import OrganizationNotificationDropdown from "./OrganizationNotificationDropdown";

import "../../styles/Notification.css";

function OrganizationNotificationBell() {
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
      const response = await getOrganizationNotifications();

      setNotifications(response);
    } catch (error) {
      console.error("Failed to load organization notifications:", error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return (
    <div className="notification-wrapper" ref={dropdownRef}>
      <button className="notification-btn" onClick={() => setOpen(!open)}>
        <FaBell />

        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </button>

      {open && (
        <OrganizationNotificationDropdown
          notifications={notifications}
          refresh={loadNotifications}
        />
      )}
    </div>
  );
}

export default OrganizationNotificationBell;
