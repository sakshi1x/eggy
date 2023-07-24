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
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },



      ],

    },{
      path:"/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/info" />, index: true },
        { path: 'info', element: <InfoPage/> },]

    }
    // {path:'info',element:<InfoPage/>},


  ]);

  return routes;
}
