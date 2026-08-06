import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Chatbot from "../components/chatbot/Chatbot";
import "./DashboardLayout.css";

function DashboardLayout({ children, role }) {
  return (
    <div className="dashboard-container">
      <Sidebar role={role} />

      <div className="dashboard-content">
        <Topbar />

        <main className="page-content">{children}</main>

        <Chatbot />
      </div>
    </div>
  );
}

export default DashboardLayout;
