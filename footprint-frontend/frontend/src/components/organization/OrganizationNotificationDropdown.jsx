import { useNavigate } from "react-router-dom";
import { markOrganizationNotificationAsRead } from "../../services/organizationService";
import NotificationItem from "../notification/NotificationItem";

function OrganizationNotificationDropdown({ notifications, refresh }) {
  const navigate = useNavigate();

  const handleClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await markOrganizationNotificationAsRead(notification.id);
        refresh();
      } catch (error) {
        console.error(error);
      }
    }

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

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

export default OrganizationNotificationDropdown;
