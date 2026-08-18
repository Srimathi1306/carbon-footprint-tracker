import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Activity from "./pages/user/Activity";
import Profile from "./pages/user/Profile";
import Analytics from "./pages/user/Analytics";
import Goals from "./pages/user/Goals";

import Categories from "./pages/admin/Categories";
import EmissionFactors from "./pages/admin/EmissionFactors";
import ActivityMonitoring from "./pages/admin/ActivityMonitoring";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

import Recommendations from "./pages/user/Recommendations";
import Benchmark from "./pages/user/Benchmark";
import Leaderboard from "./pages/user/Leaderboard";
import Badges from "./pages/user/Badges";
import DailyMissions from "./pages/user/DailyMissions";

import Support from "./pages/support/Support";
import TicketDetails from "./pages/support/TicketDetails";

import AdminSupport from "./pages/admin/AdminSupport";
import AdminTicketDetails from "./pages/admin/AdminTicketDetails";

import ActivityHistory from "./pages/user/ActivityHistory";

import AdminUsers from "./pages/admin/Users";

import OrganizationLogin from "./pages/auth/OrganizationLogin";
import OrganizationRegister from "./pages/auth/OrganizationRegister";

import OrganizationDashboard from "./pages/organization/OrganizationDashboard.jsx";
import OrganizationProtectedRoute from "./components/organization/OrganizationProtectedRoute";
import OrganizationUsers from "./pages/organization/OrganizationUsers.jsx";
import OrganizationProfile from "./pages/organization/OrganizationProfile";
import OrganizationActivities from "./pages/organization/OrganizationActivities";
import OrganizationAnalytics from "./pages/organization/OrganizationAnalytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <RoleProtectedRoute>
            <AdminDashboard />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RoleProtectedRoute>
            <AdminUsers />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/categories"
        element={
          <RoleProtectedRoute>
            <Categories />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/emission-factors"
        element={
          <RoleProtectedRoute>
            <EmissionFactors />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/activity-monitoring"
        element={
          <RoleProtectedRoute>
            <ActivityMonitoring />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <RoleProtectedRoute>
            <AdminAnalytics />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/support"
        element={
          <RoleProtectedRoute>
            <AdminSupport />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin/support/:id"
        element={
          <RoleProtectedRoute>
            <AdminTicketDetails />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/activity-history"
        element={
          <ProtectedRoute>
            <ActivityHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/activities"
        element={
          <ProtectedRoute>
            <Activity />
          </ProtectedRoute>
        }
      />

      {/* <Route path="/add-activity" element={<AddActivity />} /> */}

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <Goals />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/benchmark"
        element={
          <ProtectedRoute>
            <Benchmark />
          </ProtectedRoute>
        }
      />

      <Route
        path="/daily-missions"
        element={
          <ProtectedRoute>
            <DailyMissions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/badges"
        element={
          <ProtectedRoute>
            <Badges />
          </ProtectedRoute>
        }
      />

      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        }
      />

      <Route
        path="/support/:id"
        element={
          <ProtectedRoute>
            <TicketDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="/organization/login" element={<OrganizationLogin />} />

      <Route path="/organization/register" element={<OrganizationRegister />} />

      <Route
        path="/organization/dashboard"
        element={
          <OrganizationProtectedRoute>
            <OrganizationDashboard />
          </OrganizationProtectedRoute>
        }
      />

      <Route
        path="/organization/users"
        element={
          <OrganizationProtectedRoute>
            <OrganizationUsers />
          </OrganizationProtectedRoute>
        }
      />

      <Route
        path="/organization/profile"
        element={
          <OrganizationProtectedRoute>
            <OrganizationProfile />
          </OrganizationProtectedRoute>
        }
      />

      <Route
        path="/organization/activities"
        element={
          <OrganizationProtectedRoute>
            <OrganizationActivities />
          </OrganizationProtectedRoute>
        }
      />

      <Route
        path="/organization/analytics"
        element={
          <OrganizationProtectedRoute>
            <OrganizationAnalytics />
          </OrganizationProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
