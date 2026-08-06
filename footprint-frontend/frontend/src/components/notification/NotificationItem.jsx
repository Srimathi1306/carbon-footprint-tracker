function NotificationItem({ notification, onClick }) {
  return (
    <div
      className={`notification-item ${!notification.isRead ? "unread" : ""}`}
      onClick={onClick}
    >
      <div className="notification-title">{notification.title}</div>

      <div className="notification-message">{notification.message}</div>

      <div className="notification-time">
        {new Date(notification.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

export default NotificationItem;
