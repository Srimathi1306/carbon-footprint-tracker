import { markAsRead } from "../../services/notificationService";
import { useNavigate } from "react-router-dom";
import NotificationItem from "./NotificationItem";

function NotificationDropdown({ notifications, refresh }) {
  const navigate = useNavigate();

  const handleClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await markAsRead(notification.id);
        refresh();
      } catch (error) {
        console.error(error);
      }
    }

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  // const handleClick = async (notification) => {
  //   console.log("Notification:", notification);
  //   console.log("Action URL:", notification.actionUrl);

  //   if (!notification.isRead) {
  //     await markAsRead(notification.id);
  //     refresh();
  //   }

  //   if (notification.actionUrl) {
  //     // window.location.href = notification.actionUrl;

  //     alert(notification.actionUrl);
  //     console.log(notification);
  //   }
  // };

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h3>Notifications</h3>
      </div>

      {notifications.length === 0 ? (
        <div className="notification-empty">No notifications</div>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={() => handleClick(notification)}
          />
        ))
      )}
    </div>
  );
}

export default NotificationDropdown;
