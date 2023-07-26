import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import DashboardAppPage from './pages/DashboardAppPage';
import InfoPage from './pages/info';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'info', element: <InfoPage /> }, // Add this line if you want info as a child of the dashboard as well
      ],
    },
    {
      path: '*', // Catch-all route
      element: <Navigate to="/app" replace />, // Redirect to /dashboard
    },
  ]);

  return routes;
}
