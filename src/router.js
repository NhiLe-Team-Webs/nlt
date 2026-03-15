import { createBrowserRouter } from 'react-router-dom';
import App from './App'; // Main application component with onboarding flow
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

export default router;