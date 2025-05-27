import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'

// COMPONENTS FOLDER
import { Layout } from './components/layout/layout';
import { ProtectedRoute } from './components/middleware/protectedRoute';

// PAGES FOLDER
import Home from './pages/home/home';
import { AuthRedirect } from './pages/authRedirect';
import AdminDashboard from './pages/admin/dashboard';
import UserDashboard from './pages/user/dashboard';

import LoginPage from './pages/loginPage';
import NotAutorized from './pages/notAutorizedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/auth-redirect' element={<AuthRedirect />} />
          <Route path='/not-authorized' element={<NotAutorized />} />

          <Route
            path='/admin-dashboard'
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } />

          <Route
            path='/user-dashboard'
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
          {/* Add more page components as needed
        */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App