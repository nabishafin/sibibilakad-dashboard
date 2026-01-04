import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import UserManagementPage from "../pages/UserManagementPage";
import FinancialPage from "../pages/FinancialPage";
import RoundExplorerPage from "../pages/RoundExplorerPage";

const router = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
]);

export default router;
