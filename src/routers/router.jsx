import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import UserManagementPage from "../pages/UserManagementPage";
import FinancialPage from "../pages/FinancialPage";
import RoundExplorerPage from "../pages/RoundExplorerPage";
import SystemReportsPage from "../pages/SystemReportsPage";
import AuditTrailPage from "../pages/AuditTrailPage";
import LoginSection from "../auth/LoginSection";
import RegisterSection from "../auth/RegisterSection";
import RecoverAccount from "../auth/RecoverAccount";
import ResetPassword from "../auth/ResetPassword";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSection />
  },
  {
    path: "register",
    element: <RegisterSection />
  },
  {
    path: "recover-account",
    element: <RecoverAccount />
  },
  {
    path: "reset-password",
    element: <ResetPassword />
  },
  {
    path: "dashboard",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <UserManagementPage />,
          },
          {
            path: "financial",
            element: <FinancialPage />,
          },
          {
            path: "round-explorer",
            element: <RoundExplorerPage />,
          },
          {
            path: "system-reports",
            element: <SystemReportsPage />,
          },
          {
            path: "audit-trail",
            element: <AuditTrailPage />,
          },
        ],
      }
    ]
  },
]);

export default router;
