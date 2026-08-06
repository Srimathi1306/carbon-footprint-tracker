import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getNotifications,
  markAsRead,
} from "../../services/notificationService";
import "../../styles/notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();

      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRead = async (id) => {
    await markAsRead(id);

    loadNotifications();
  };

  return (
    <DashboardLayout>
      <div className="notification-container">
        <h2>Notifications</h2>

        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-card ${n.isRead ? "read" : "unread"}`}
            >
              <div className="notification-header">
                <h3>{n.title}</h3>

                <span>{n.type}</span>
              </div>

              <p>{n.message}</p>

              <small>{new Date(n.createdAt).toLocaleString()}</small>

              {!n.isRead && (
                <button onClick={() => handleRead(n.id)}>Mark as Read</button>
              )}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

export default Notifications;
