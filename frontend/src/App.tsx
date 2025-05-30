import { Route, Routes } from 'react-router-dom';
import './App.scss'

// COMPONENTS FOLDER
import { Layout } from './components/layout/layout';
import { ProtectedRoute } from './components/middleware/protectedRoute';
// gave error when compiling import { LogoutButton } from './components/LogoutButton';

// PAGES FOLDER
import Home from './pages/home/home';
import AdminDashboard from './pages/admin/dashboard';
import AdminSettings from './pages/admin/adminSetting';
import UserDashboard from './pages/user/dashboard';
import UserSettings from './pages/user/userSetting';
import RedirectAfterLogin from './components/middleware/redirectAfterLogin';

import LoginPage from './pages/loginPage';
import NotAutorized from './pages/authorizing/notAutorizedPage';
import Search from './pages/search/search';

function App() {
  return (
      <Routes>
        <Route path='login-redirect' element={<RedirectAfterLogin />} />

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
          path='user-dashboard'
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path='user-settings' 
          element={
            <UserSettings />
          } 
        />
          </Route>
      </Routes>
  );
}

export default App